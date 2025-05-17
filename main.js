const loginBtn = document.getElementById("googleLoginBtn");
const usernameSection = document.getElementById("usernameSection");
const usernameInput = document.getElementById("usernameInput");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");

const profile = document.getElementById("profile");
const profileName = document.getElementById("profileName");
const profileScore = document.getElementById("profileScore");

loginBtn.onclick = async () => {
  const { auth, db, signInWithPopup, GoogleAuthProvider, doc, getDoc } = window.firebase;
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      showProfile(userData.username, userData.score);
    } else {
      usernameSection.classList.remove("hidden");
      saveUsernameBtn.onclick = async () => {
        const username = usernameInput.value.trim();
        if (username) {
          await window.firebase.setDoc(userRef, {
            username,
            score: 0,
            consecutiveLosses: 0
          });
          showProfile(username, 0);
        }
      };
    }
  } catch (error) {
    alert("Login failed: " + error.message);
  }
};

function showProfile(username, score) {
  usernameSection.classList.add("hidden");
  profile.classList.remove("hidden");
  profileName.textContent = username;
  profileScore.textContent = score;
      }
  
