// main.js

const loginBtn = document.getElementById("googleLoginBtn");
const usernameSection = document.getElementById("usernameSection");
const usernameInput = document.getElementById("usernameInput");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");

const profile = document.getElementById("profile");
const profileName = document.getElementById("profileName");
const profileScore = document.getElementById("profileScore");

let currentUser = null;
let userDocRef = null;

const ADMIN_UIDS = ["uhJl4FERtDMjC2r8Jg6tm54WGtm1"];

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
      alert("Login failed.");
      return;
    }

    currentUser = user;
    userDocRef = doc(db, "users", user.uid);

    if (ADMIN_UIDS.includes(user.uid)) {
      document.getElementById("adminPanel").classList.remove("hidden");
      return;
    }

    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      showProfile(userData.username, userData.score);
    } else {
      usernameSection.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed: " + error.message);
  }
};

saveUsernameBtn.onclick = async () => {
  const { setDoc } = window.firebase;
  const username = usernameInput.value.trim();
  if (!username || !userDocRef) return;

  await setDoc(userDocRef, {
    username,
    score: 0,
    consecutiveLosses: 0
  });

  usernameSection.classList.add("hidden");
  showProfile(username, 0);
};

// Utility function
function showProfile(name, score) {
  profileName.textContent = name;
  profileScore.textContent = score;
  profile.classList.remove("hidden");
}
