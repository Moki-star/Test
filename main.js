const loginBtn = document.getElementById("googleLoginBtn");
const usernameSection = document.getElementById("usernameSection");
const usernameInput = document.getElementById("usernameInput");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");

const profile = document.getElementById("profile");
const profileName = document.getElementById("profileName");
const profileScore = document.getElementById("profileScore");

let puzzles = [];
let currentPuzzleIndex = 0;
let currentUser = null;
let userDocRef = null;

const ADMIN_UIDS = [
  "uhJl4FERtDMjC2r8Jg6tm54WGtm1" // Replace this with your actual Firebase UID if needed
];

loginBtn.onclick = async () => {
  const {
    auth,
    db,
    signInWithPopup,
    GoogleAuthProvider,
    doc,
    getDoc,
    setDoc
  } = window.firebase;

  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) {
      alert("User not found after login.");
      return;
    }

    currentUser = user;
    userDocRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userDocRef);

    if (ADMIN_UIDS.includes(user.uid)) {
      await loadAdminPanel();
      return;
    }

    if (userSnap.exists()) {
      const userData = userSnap.data();
      const now = Date.now();

      if (userData.cooldownEndTime && now < userData.cooldownEndTime) {
        showCooldown(userData.cooldownEndTime);
      } else {
        showProfile(userData.username, userData.score);
        await loadPuzzles();
        showPuzzle();
      }
    } else {
      usernameSection.classList.remove("hidden");
      saveUsernameBtn.onclick = async () => {
        const username = usernameInput.value.trim();
        if (!username) return;

        await setDoc(userDocRef, {
          username,
          score: 0,
          consecutiveLosses: 0
        });

        showProfile(username, 0);
        await loadPuzzles();
        showPuzzle();
      };
    }
  } catch (error) {
    console.error("Google login error:", error);
    alert("Google login failed: " + error.message);
  }
};
