// ============================================================
// NGO-ID #WB303 — KalNahiAajDaan Foundation — Main Application
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ── ADMIN SYNC: load campaigns & stories from admin localStorage ──
    (function syncFromAdmin() {
        const adminCampaigns = localStorage.getItem('admin_campaigns');
        if (adminCampaigns) {
            const parsed = JSON.parse(adminCampaigns);
            CAMPAIGNS.length = 0;
            parsed.forEach(c => CAMPAIGNS.push(c));
        }
        const adminStories = localStorage.getItem('admin_stories');
        if (adminStories) {
            const parsed = JSON.parse(adminStories);
            STORIES.length = 0;
            parsed.forEach(s => STORIES.push(s));
        }
    })();

    // Helper: persist campaign state back to admin localStorage
    function syncCampaignsToAdmin() {
        localStorage.setItem('admin_campaigns', JSON.stringify(CAMPAIGNS));
    }

    // ── SPA ROUTER ──────────────────────────────────────────────
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-link, .tab');
    let currentSection = 'campaigns';

    function navigateTo(sectionName) {
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const target = document.getElementById(`section-${sectionName}`);
        if (target) {
            target.classList.add('active');
            currentSection = sectionName;
        }

        navLinks.forEach(l => {
            if (l.dataset.section === sectionName) l.classList.add('active');
        });

        // Trigger section-specific init
        if (sectionName === 'impact') initImpactAnimations();
        if (sectionName === 'campaigns') animateCampaignProgress();
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            navigateTo(section);
            history.pushState(null, '', `#${section}`);
        });
    });

    // Handle hash on load
    const initialHash = location.hash.replace('#', '') || 'campaigns';
    navigateTo(initialHash);
    window.addEventListener('hashchange', () => {
        navigateTo(location.hash.replace('#', ''));
    });

    // ── CAMPAIGNS ───────────────────────────────────────────────
    function renderCampaignKPIs() {
        const container = document.getElementById('campaign-kpis');
        const totalRaised = CAMPAIGNS.reduce((sum, c) => sum + c.raised, 0);
        const activeCampaigns = CAMPAIGNS.filter(c => c.status !== 'completed').length;
        const avgCompletion = Math.round(
            CAMPAIGNS.reduce((sum, c) => sum + (c.raised / c.goal) * 100, 0) / CAMPAIGNS.length
        );

        container.innerHTML = `
            <div class="kpi-card">
                <span class="kpi-value">₹${formatNumber(totalRaised)}</span>
                <span class="kpi-label">Total Raised</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${activeCampaigns}</span>
                <span class="kpi-label">Active Campaigns</span>
            </div>
            <div class="kpi-card">
                <span class="kpi-value">${avgCompletion}%</span>
                <span class="kpi-label">Avg Completion</span>
            </div>
        `;
    }

    function renderCampaigns(filter = 'all', search = '') {
        const grid = document.getElementById('campaign-grid');
        let filtered = CAMPAIGNS;

        if (filter !== 'all') {
            filtered = filtered.filter(c => c.category === filter);
        }
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(c =>
                c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
            );
        }

        grid.innerHTML = filtered.map((c, i) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            const badgeClass = c.status === 'urgent' ? 'badge-urgent' :
                               c.status === 'completed' ? 'badge-completed' : 'badge-active';
            const badgeText = c.status.charAt(0).toUpperCase() + c.status.slice(1);

            return `
                <div class="campaign-card" style="animation-delay: ${i * 0.08}s">
                    <div class="card-header" style="background: ${c.image}">
                        <span class="card-badge ${badgeClass}">${badgeText}</span>
                        <span class="card-category">${c.category}</span>
                    </div>
                    <div class="card-body">
                        <h3>${c.title}</h3>
                        <p>${c.description}</p>
                        <div class="progress-wrap">
                            <div class="progress-info">
                                <span>₹${formatNumber(c.raised)} raised</span>
                                <span>₹${formatNumber(c.goal)} goal</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-fill" data-width="${pct}" style="width: 0%"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="card-donors">${c.donors} donors • ${c.daysLeft > 0 ? c.daysLeft + ' days left' : 'Completed'}</span>
                        <button class="card-btn" onclick="handleDonateToCampaign('${c.id}')">Donate Now</button>
                    </div>
                </div>
            `;
        }).join('');

        // Animate progress bars after a brief delay
        setTimeout(animateCampaignProgress, 100);
    }

    function animateCampaignProgress() {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const w = bar.dataset.width;
            bar.style.width = `${Math.min(w, 100)}%`;
        });
    }

    // Campaign filters
    document.getElementById('filter-pills').addEventListener('click', (e) => {
        if (e.target.classList.contains('pill')) {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            const search = document.getElementById('campaign-search').value;
            renderCampaigns(filter, search);
        }
    });

    document.getElementById('campaign-search').addEventListener('input', (e) => {
        const activeFilter = document.querySelector('.pill.active')?.dataset.filter || 'all';
        renderCampaigns(activeFilter, e.target.value);
    });

    // Init campaigns
    const storedDonations = JSON.parse(localStorage.getItem('donations') || '[]');
    storedDonations.forEach(d => {
        if (d.campaignId) {
            const camp = CAMPAIGNS.find(c => c.id === d.campaignId);
            if (camp) {
                camp.raised += d.amount;
                camp.donors += 1;
            }
        } else if (d.campaign) {
            const exactName = d.campaign.replace(' (Resources)', '');
            const camp = CAMPAIGNS.find(c => c.title === exactName);
            if (camp) {
                camp.raised += d.amount;
                camp.donors += 1;
            }
        }
    });
    renderCampaignKPIs();
    renderCampaigns();
    syncCampaignsToAdmin();

    // ── DONATE ──────────────────────────────────────────────────
    let selectedPreset = null;
    let resourceQuantities = {};

    function renderDonatePresets() {
        const grid = document.getElementById('preset-grid');
        grid.innerHTML = DONATION_PRESETS.map((p, i) => `
            <div class="preset-card" data-index="${i}" data-amount="${p.amount}">
                <div class="preset-icon">${p.icon}</div>
                <div class="preset-amount">₹${p.amount.toLocaleString('en-IN')}</div>
                <div class="preset-label">${p.label}</div>
            </div>
        `).join('');

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.preset-card');
            if (!card) return;
            document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedPreset = parseInt(card.dataset.amount);
            document.getElementById('custom-amount').value = '';
        });
    }

    function renderCampaignSelect() {
        const selects = [document.getElementById('campaign-select'), document.getElementById('resource-campaign-select')];
        selects.forEach(select => {
            if (!select) return;
            select.innerHTML = '<option value="">— General Fund —</option>';
            CAMPAIGNS.filter(c => c.status !== 'completed').forEach(c => {
                const opt = document.createElement('option');
                opt.value = c.id;
                opt.textContent = c.title;
                select.appendChild(opt);
            });
        });
    }

    function updateResourceTotal() {
        let total = 0;
        Object.entries(resourceQuantities).forEach(([id, q]) => {
            const cat = RESOURCE_CATEGORIES.find(r => r.id === id);
            total += q * cat.price;
        });
        document.getElementById('resource-total').textContent = `₹${total.toLocaleString('en-IN')}`;
    }

    window.updateResourceQty = function(id, delta) {
        resourceQuantities[id] = Math.max(0, (resourceQuantities[id] || 0) + delta);
        document.getElementById(`qty-${id}`).textContent = resourceQuantities[id];
        const card = document.querySelector(`.resource-card[data-id="${id}"]`);
        if (resourceQuantities[id] > 0) card.classList.add('selected');
        else card.classList.remove('selected');
        updateResourceTotal();
    };

    function renderResourceGrid() {
        const grid = document.getElementById('resource-grid');
        grid.innerHTML = RESOURCE_CATEGORIES.map(r => {
            resourceQuantities[r.id] = 0;
            return `
                <div class="resource-card" data-id="${r.id}">
                    <div class="resource-icon">${r.icon}</div>
                    <div class="resource-label">${r.label}</div>
                    <div style="font-size: 0.75rem; color: var(--primary); font-weight: 700; margin-bottom: 0.25rem;">₹${r.price.toLocaleString('en-IN')} / ${r.unit.replace(/s$/, '')}</div>
                    <div class="resource-qty">
                        <button onclick="updateResourceQty('${r.id}', -1)">−</button>
                        <span id="qty-${r.id}">0</span>
                        <button onclick="updateResourceQty('${r.id}', 1)">+</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderRecentDonations() {
        const list = document.getElementById('recent-donations-list');
        const stored = JSON.parse(localStorage.getItem('donations') || '[]');
        const all = [...stored.slice(-5).reverse(), ...RECENT_DONATIONS_SEED];
        list.innerHTML = all.slice(0, 6).map(d => `
            <div class="donation-item">
                <span class="d-amount">₹${d.amount.toLocaleString('en-IN')}</span>
                <span class="d-info">${d.name} • ${d.campaign} • ${d.time}</span>
            </div>
        `).join('');
    }

    // Donate tabs
    document.querySelectorAll('.donate-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.donate-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.donate-mode').forEach(m => m.classList.remove('active'));
            document.getElementById(tab.dataset.mode === 'money' ? 'money-mode' : 'resource-mode').classList.add('active');
        });
    });

    // Custom amount clears preset
    document.getElementById('custom-amount').addEventListener('input', () => {
        selectedPreset = null;
        document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('selected'));
    });

    // Donate button
    document.getElementById('donate-btn').addEventListener('click', () => {
        const customAmt = parseInt(document.getElementById('custom-amount').value);
        const amount = customAmt || selectedPreset;
        if (!amount || amount <= 0) {
            alert('Please select or enter a donation amount.');
            return;
        }
        const name = document.getElementById('donor-name').value || 'Anonymous';
        const campaignId = document.getElementById('campaign-select').value;
        const campaign = CAMPAIGNS.find(c => c.id === campaignId);
        const campaignName = campaign ? campaign.title : 'General Fund';

        // Add monetary equivalent to donations and update campaign
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations.push({ name, amount, campaign: campaignName, campaignId: campaign ? campaign.id : null, time: 'Just now' });
        localStorage.setItem('donations', JSON.stringify(donations));

        // Sync with campaign
        if (campaign) {
            campaign.raised += amount;
            campaign.donors += 1;
            renderCampaigns(document.querySelector('.pill.active')?.dataset.filter || 'all', document.getElementById('campaign-search').value);
            renderCampaignKPIs();
        }

        showDonationModal(`₹${amount.toLocaleString('en-IN')} donated by ${name} to ${campaignName}. Thank you for your generosity!`);
        renderRecentDonations();
        syncCampaignsToAdmin();

        // Reset
        selectedPreset = null;
        document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('custom-amount').value = '';
        document.getElementById('donor-name').value = '';
    });

    // Resource donate button
    document.getElementById('resource-donate-btn').addEventListener('click', () => {
        const items = Object.entries(resourceQuantities).filter(([, q]) => q > 0);
        if (items.length === 0) {
            alert('Please select at least one resource to donate.');
            return;
        }
        
        let totalAmount = 0;
        const name = document.getElementById('resource-donor-name').value || 'Anonymous';
        const summary = items.map(([id, q]) => {
            const cat = RESOURCE_CATEGORIES.find(r => r.id === id);
            totalAmount += q * cat.price;
            return `${q} ${cat.unit} of ${cat.label}`;
        }).join(', ');
        
        const campaignId = document.getElementById('resource-campaign-select').value;
        const campaign = CAMPAIGNS.find(c => c.id === campaignId);
        const campaignName = campaign ? campaign.title : 'General Fund';

        // Add monetary equivalent to donations and update campaign
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations.push({ name, amount: totalAmount, campaign: campaignName + ' (Resources)', campaignId: campaign ? campaign.id : null, time: 'Just now' });
        localStorage.setItem('donations', JSON.stringify(donations));

        // Sync with campaign
        if (campaign) {
            campaign.raised += totalAmount;
            campaign.donors += 1;
            renderCampaigns(document.querySelector('.pill.active')?.dataset.filter || 'all', document.getElementById('campaign-search').value);
            renderCampaignKPIs();
        }
        syncCampaignsToAdmin();

        showDonationModal(`${name} donated ${summary} (Value: ₹${totalAmount.toLocaleString('en-IN')}) to ${campaignName}. Your contribution will reach those in need!`);
        renderRecentDonations();

        // Reset
        Object.keys(resourceQuantities).forEach(id => {
            resourceQuantities[id] = 0;
            document.getElementById(`qty-${id}`).textContent = '0';
        });
        document.querySelectorAll('.resource-card').forEach(c => c.classList.remove('selected'));
        updateResourceTotal();
        document.getElementById('resource-donor-name').value = '';
    });

    // Init donate
    renderDonatePresets();
    renderCampaignSelect();
    renderResourceGrid();
    renderRecentDonations();

    // Navigate to donate from campaign card
    window.handleDonateToCampaign = function(campaignId) {
        navigateTo('donate');
        history.pushState(null, '', '#donate');
        setTimeout(() => {
            document.getElementById('campaign-select').value = campaignId;
        }, 100);
    };

    // ── DONATION MODAL ──────────────────────────────────────────
    function showDonationModal(message) {
        const modal = document.getElementById('donation-modal');
        document.getElementById('modal-message').textContent = message;
        modal.classList.add('show');
        spawnConfetti();
    }

    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('donation-modal').classList.remove('show');
    });

    function spawnConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';
        const colors = ['#5af0b3', '#7bd0ff', '#e8ccff', '#fbbf24', '#f472b6', '#fb923c'];
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.className = 'confetti';
            el.style.left = Math.random() * 100 + '%';
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.animationDelay = Math.random() * 1.5 + 's';
            el.style.animationDuration = (2 + Math.random() * 2) + 's';
            el.style.width = (6 + Math.random() * 6) + 'px';
            el.style.height = (6 + Math.random() * 6) + 'px';
            el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            container.appendChild(el);
        }
    }

    // ── STORIES ─────────────────────────────────────────────────
    let currentStory = 0;

    function renderStories() {
        const viewport = document.getElementById('stories-viewport');
        const dots = document.getElementById('story-dots');

        viewport.innerHTML = STORIES.map((s, i) => `
            <div class="story-card ${i === 0 ? 'active' : ''}" data-index="${i}">
                <div class="story-visual" style="background: ${s.gradient}${s.image ? ', ' + s.image : ''}; background-size: cover; background-position: center; background-blend-mode: overlay;">
                    <span class="story-subtitle">${s.subtitle}</span>
                </div>
                <div class="story-content">
                    <h2>${s.title}</h2>
                    <p class="story-narrative">${s.narrative}</p>
                    <div class="story-stats">
                        ${s.stats.map(st => `
                            <div class="story-stat">
                                <span class="story-stat-value" data-target="${typeof st.value === 'number' ? st.value : ''}">${typeof st.value === 'number' ? '0' : st.value}</span>
                                <span class="story-stat-label">${st.label}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="story-quote">
                        <p>${s.quote}</p>
                        <p class="quotee">${s.quotee}</p>
                    </div>
                </div>
            </div>
        `).join('');

        dots.innerHTML = STORIES.map((_, i) => `
            <button class="story-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>
        `).join('');

        // Dot click
        dots.addEventListener('click', (e) => {
            if (e.target.classList.contains('story-dot')) {
                goToStory(parseInt(e.target.dataset.index));
            }
        });

        // Animate first story stats
        animateStoryStats(0);
    }

    function goToStory(index) {
        currentStory = index;
        document.querySelectorAll('.story-card').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('.story-dot').forEach(d => d.classList.remove('active'));

        document.querySelector(`.story-card[data-index="${index}"]`).classList.add('active');
        document.querySelector(`.story-dot[data-index="${index}"]`).classList.add('active');
        animateStoryStats(index);
    }

    document.getElementById('story-prev').addEventListener('click', () => {
        goToStory((currentStory - 1 + STORIES.length) % STORIES.length);
    });
    document.getElementById('story-next').addEventListener('click', () => {
        goToStory((currentStory + 1) % STORIES.length);
    });

    function animateStoryStats(storyIndex) {
        const card = document.querySelector(`.story-card[data-index="${storyIndex}"]`);
        if (!card) return;
        card.querySelectorAll('.story-stat-value').forEach(el => {
            const target = parseInt(el.dataset.target);
            if (!target) return;
            animateCounter(el, 0, target, 1500);
        });
    }

    // Auto-play stories
    setInterval(() => {
        if (currentSection === 'stories') {
            goToStory((currentStory + 1) % STORIES.length);
        }
    }, 8000);

    renderStories();

    // ── VOLUNTEER ───────────────────────────────────────────────
    let volStep = 1;
    const selectedInterests = new Set();
    const selectedDays = new Set();

    function renderInterestGrid() {
        const grid = document.getElementById('interest-grid');
        grid.innerHTML = VOLUNTEER_INTERESTS.map(v => `
            <div class="interest-card" data-id="${v.id}">
                <div class="interest-icon">${v.icon}</div>
                <div class="interest-label">${v.label}</div>
            </div>
        `).join('');

        grid.addEventListener('click', (e) => {
            const card = e.target.closest('.interest-card');
            if (!card) return;
            const id = card.dataset.id;
            if (selectedInterests.has(id)) {
                selectedInterests.delete(id);
                card.classList.remove('selected');
            } else {
                selectedInterests.add(id);
                card.classList.add('selected');
            }
        });
    }

    // Day toggles
    document.getElementById('day-toggles').addEventListener('click', (e) => {
        if (e.target.classList.contains('day-toggle')) {
            const day = e.target.dataset.day;
            if (selectedDays.has(day)) {
                selectedDays.delete(day);
                e.target.classList.remove('selected');
            } else {
                selectedDays.add(day);
                e.target.classList.add('selected');
            }
        }
    });

    function goToVolStep(step) {
        volStep = step;
        document.querySelectorAll('.vol-step').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.stepper .step').forEach(s => {
            const sNum = parseInt(s.dataset.step);
            s.classList.remove('active', 'done');
            if (sNum === step) s.classList.add('active');
            else if (sNum < step) s.classList.add('done');
        });

        const targetId = step <= 3 ? `vol-step-${step}` : 'vol-step-success';
        document.getElementById(targetId).classList.add('active');
    }

    // Validation
    function validateStep1() {
        let valid = true;
        const name = document.getElementById('vol-name').value.trim();
        const email = document.getElementById('vol-email').value.trim();
        const phone = document.getElementById('vol-phone').value.trim();

        document.getElementById('err-name').textContent = '';
        document.getElementById('err-email').textContent = '';
        document.getElementById('err-phone').textContent = '';

        if (!name) { document.getElementById('err-name').textContent = 'Name is required'; valid = false; }
        if (!email || !/\S+@\S+\.\S+/.test(email)) { document.getElementById('err-email').textContent = 'Valid email is required'; valid = false; }
        if (!phone || phone.length < 10) { document.getElementById('err-phone').textContent = 'Valid phone number is required'; valid = false; }

        return valid;
    }

    document.getElementById('vol-next-1').addEventListener('click', () => {
        if (validateStep1()) goToVolStep(2);
    });
    document.getElementById('vol-prev-2').addEventListener('click', () => goToVolStep(1));
    document.getElementById('vol-next-2').addEventListener('click', () => {
        if (selectedInterests.size === 0) {
            alert('Please select at least one interest area.');
            return;
        }
        goToVolStep(3);
    });
    document.getElementById('vol-prev-3').addEventListener('click', () => goToVolStep(2));

    document.getElementById('vol-submit').addEventListener('click', () => {
        const volunteer = {
            name: document.getElementById('vol-name').value.trim(),
            email: document.getElementById('vol-email').value.trim(),
            phone: document.getElementById('vol-phone').value.trim(),
            interests: [...selectedInterests],
            days: [...selectedDays],
            times: [...document.querySelectorAll('.time-chip input:checked')].map(c => c.value),
            date: new Date().toISOString()
        };

        const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
        volunteers.push(volunteer);
        localStorage.setItem('volunteers', JSON.stringify(volunteers));

        goToVolStep(4); // success
    });

    renderInterestGrid();

    // ── IMPACT ──────────────────────────────────────────────────
    function renderImpactKPIs() {
        const container = document.getElementById('impact-kpis');
        container.innerHTML = IMPACT_DATA.kpis.map(k => `
            <div class="impact-kpi">
                <div class="kpi-icon">${k.icon}</div>
                <div class="kpi-value" data-target="${k.value}">${k.prefix}0${k.suffix}</div>
                <div class="kpi-label">${k.label}</div>
                <style>.impact-kpi:nth-child(${IMPACT_DATA.kpis.indexOf(k) + 1})::after { background: ${k.gradient}; }</style>
            </div>
        `).join('');
    }

    function renderBarChart() {
        const container = document.getElementById('bar-chart');
        const maxVal = Math.max(...IMPACT_DATA.monthlyFunding.map(m => m.value));
        container.innerHTML = IMPACT_DATA.monthlyFunding.map(m => {
            const pct = (m.value / maxVal) * 100;
            return `
                <div class="bar-row">
                    <span class="bar-month">${m.month}</span>
                    <div class="bar-track">
                        <div class="bar-fill" data-width="${pct}" style="width: 0%">${m.value}L</div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderDonutChart() {
        const chart = document.getElementById('donut-chart');
        const legend = document.getElementById('donut-legend');
        let cumulative = 0;
        const gradientParts = [];

        IMPACT_DATA.fundAllocation.forEach(f => {
            gradientParts.push(`${f.color} ${cumulative}% ${cumulative + f.percent}%`);
            cumulative += f.percent;
        });

        chart.style.background = `conic-gradient(${gradientParts.join(', ')})`;
        chart.innerHTML = `
            <div class="donut-center">
                <span class="big">₹32.5L</span>
                <span class="small">Total Allocated</span>
            </div>
        `;

        legend.innerHTML = IMPACT_DATA.fundAllocation.map(f => `
            <div class="legend-item">
                <span class="legend-dot" style="background: ${f.color}"></span>
                <span>${f.category}</span>
                <span class="legend-pct">${f.percent}%</span>
            </div>
        `).join('');
    }

    function renderTimeline() {
        const container = document.getElementById('timeline');
        container.innerHTML = IMPACT_DATA.milestones.map((m, i) => `
            <div class="timeline-item" style="animation-delay: ${i * 0.15}s">
                <div class="timeline-year">${m.year}</div>
                <div class="timeline-title">${m.title}</div>
                <div class="timeline-desc">${m.desc}</div>
            </div>
        `).join('');
    }

    function renderTicker() {
        const track = document.getElementById('ticker-track');
        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
        const items = [];

        donations.slice(-5).forEach(d => {
            items.push(`💚 ${d.name} donated ₹${d.amount.toLocaleString('en-IN')} to ${d.campaign}`);
        });
        volunteers.slice(-3).forEach(v => {
            items.push(`🤝 ${v.name} joined as a volunteer`);
        });

        // Add seed items
        RECENT_DONATIONS_SEED.forEach(d => {
            items.push(`💚 ${d.name} donated ₹${d.amount.toLocaleString('en-IN')} to ${d.campaign}`);
        });

        if (items.length === 0) items.push('Welcome to KalNahiAajDaan Foundation!');

        track.innerHTML = `<div class="ticker-content">${items.map(t => `<span>${t}</span>`).join('')}</div>`;
    }

    function initImpactAnimations() {
        // Animate KPI counters
        document.querySelectorAll('.impact-kpi .kpi-value').forEach(el => {
            const target = parseInt(el.dataset.target);
            if (target) {
                const kpiData = IMPACT_DATA.kpis.find(k => k.value === target);
                const prefix = kpiData ? kpiData.prefix : '';
                const suffix = kpiData ? kpiData.suffix : '';
                animateCounter(el, 0, target, 2000, prefix, suffix);
            }
        });

        // Animate bar chart fills
        setTimeout(() => {
            document.querySelectorAll('.bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });
        }, 200);
    }

    renderImpactKPIs();
    renderBarChart();
    renderDonutChart();
    renderTimeline();
    renderTicker();

    // ── UTILITIES ───────────────────────────────────────────────
    function formatNumber(num) {
        if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toLocaleString('en-IN');
    }

    function animateCounter(element, start, end, duration, prefix = '', suffix = '') {
        const startTime = performance.now();
        const range = end - start;

        function step(timestamp) {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + range * eased);
            element.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

});
