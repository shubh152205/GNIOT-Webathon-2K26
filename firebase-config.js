// ============================================================
// KalNahiAajDaan — Firebase Configuration & Firestore Helpers
// ============================================================

const firebaseConfig = {
    apiKey: "AIzaSyDqXZKf5Wmg7cxMn4z-OzBH116MmPrAddw",
    authDomain: "kalnahiaajdaan-shubh-152205.firebaseapp.com",
    projectId: "kalnahiaajdaan-shubh-152205",
    storageBucket: "kalnahiaajdaan-shubh-152205.firebasestorage.app",
    messagingSenderId: "438589238825",
    appId: "1:438589238825:web:ca12e298ed3255054a7638"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ── Firestore Helper Functions ──────────────────────────────

// CAMPAIGNS
async function fbGetCampaigns() {
    const snapshot = await db.collection('campaigns').get();
    if (snapshot.empty) {
        // Seed from data.js if Firestore is empty
        if (typeof CAMPAIGNS !== 'undefined' && CAMPAIGNS.length > 0) {
            for (const c of CAMPAIGNS) {
                await db.collection('campaigns').doc(c.id).set({ ...c });
            }
            return CAMPAIGNS.map(c => ({ ...c }));
        }
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function fbSaveCampaign(campaign) {
    await db.collection('campaigns').doc(campaign.id).set(campaign);
}

async function fbDeleteCampaign(id) {
    await db.collection('campaigns').doc(id).delete();
}

// STORIES
async function fbGetStories() {
    const snapshot = await db.collection('stories').get();
    if (snapshot.empty) {
        if (typeof STORIES !== 'undefined' && STORIES.length > 0) {
            for (const s of STORIES) {
                await db.collection('stories').doc(s.id).set({ ...s });
            }
            return STORIES.map(s => ({ ...s }));
        }
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function fbSaveStory(story) {
    await db.collection('stories').doc(story.id).set(story);
}

async function fbDeleteStory(id) {
    await db.collection('stories').doc(id).delete();
}

// DONATIONS
async function fbGetDonations() {
    const snapshot = await db.collection('donations').orderBy('timestamp', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function fbAddDonation(donation) {
    donation.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const ref = await db.collection('donations').add(donation);
    return ref.id;
}

// VOLUNTEERS
async function fbGetVolunteers() {
    const snapshot = await db.collection('volunteers').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function fbAddVolunteer(volunteer) {
    volunteer.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const ref = await db.collection('volunteers').add(volunteer);
    return ref.id;
}

async function fbUpdateVolunteer(id, data) {
    await db.collection('volunteers').doc(id).update(data);
}
