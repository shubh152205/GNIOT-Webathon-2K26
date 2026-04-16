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
        // Migration: check if there's data in localStorage first to preserve user's work
        let localCampaigns = null;
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('admin_campaigns');
            if (raw) localCampaigns = JSON.parse(raw);
        }
        
        const seedData = (localCampaigns && localCampaigns.length > 0) ? localCampaigns : (typeof CAMPAIGNS !== 'undefined' ? CAMPAIGNS : []);
        
        if (seedData.length > 0) {
            for (const c of seedData) {
                // If storing Base64, hope it's < 1MiB or use compression, but for legacy migration we just push
                try {
                    await db.collection('campaigns').doc(c.id).set({ ...c });
                } catch(e) { console.warn("Failed migrating campaign", c.id, e) }
            }
            return seedData.map(c => ({ ...c }));
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
        let localStories = null;
        if (typeof localStorage !== 'undefined') {
            const raw = localStorage.getItem('admin_stories');
            if (raw) localStories = JSON.parse(raw);
        }
        
        const seedData = (localStories && localStories.length > 0) ? localStories : (typeof STORIES !== 'undefined' ? STORIES : []);
        
        if (seedData.length > 0) {
            for (const s of seedData) {
                try {
                    await db.collection('stories').doc(s.id).set({ ...s });
                } catch(e) { console.warn("Failed migrating story", s.id, e) }
            }
            return seedData.map(s => ({ ...s }));
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
