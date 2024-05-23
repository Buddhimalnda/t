import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { FIREBASE_STORAGE } from "../../../config/firebase";

export async function uploadStringData(yourStringData, uid) {
  // Convert the string to a Blob
  const blob = new Blob([yourStringData], { type: "text/plain" });

  // Create a reference to 'yourFileName.txt' in Firebase Storage

  const storageRef = ref(FIREBASE_STORAGE, "/user/" + uid + "/data.txt");

  // Put the Blob to Firebase Storage
  console.log(blob);

  try {
    // Wait for the upload to complete
    const snapshot = await uploadBytes(storageRef, blob);
    console.log("Uploaded a blob or file!");

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File available at", downloadURL);
    return downloadURL; // Return the download URL
  } catch (error) {
    console.error("Error uploading string data:", error);
    throw error; // Throw error if upload failed
  }
}
