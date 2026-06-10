document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Active Tab Switcher (Hero Widget)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchBtn = document.querySelector('.btn-search span');
    const returnBlock = document.getElementById('return-date-block');
    const returnVal = document.getElementById('return-date-val');
    const returnSub = document.getElementById('return-date-sub');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            searchBtn.textContent = `Search ${category}`;
            
            // Adjust form placeholders/labels depending on tab
            const fromLabel = document.querySelector('#from-block label');
            const toLabel = document.querySelector('#to-block label');
            const fromCity = document.querySelector('#from-city');
            const fromAirport = document.querySelector('#from-airport');
            const toCity = document.querySelector('#to-city');
            const toAirport = document.querySelector('#to-airport');

            if (category === 'Trains') {
                fromLabel.textContent = 'From Station';
                toLabel.textContent = 'To Station';
                fromCity.textContent = 'New Delhi';
                fromAirport.textContent = 'NDLS - New Delhi';
                toCity.textContent = 'Patna Jn';
                toAirport.textContent = 'PNBE - Patna';
            } else if (category === 'Buses') {
                fromLabel.textContent = 'From City';
                toLabel.textContent = 'To City';
                fromCity.textContent = 'Delhi';
                fromAirport.textContent = 'Kashmere Gate ISBT';
                toCity.textContent = 'Manali';
                toAirport.textContent = 'Manali Bus Stand';
            } else if (category === 'Hotels') {
                fromLabel.textContent = 'Destination / Hotel';
                toLabel.textContent = 'Guests & Rooms';
                fromCity.textContent = 'Goa, India';
                fromAirport.textContent = '350+ hotels available';
                toCity.textContent = '2 Guests';
                toAirport.textContent = '1 Room';
            } else {
                // Flights defaults
                fromLabel.textContent = 'From';
                toLabel.textContent = 'To';
                fromCity.textContent = 'Delhi';
                fromAirport.textContent = 'DEL - Indira Gandhi Intl';
                toCity.textContent = 'Bengaluru';
                toAirport.textContent = 'BLR - Kempegowda Intl';
            }
        });
    });

    // 3. Swap From and To Cities
    const swapBtn = document.getElementById('swap-cities-btn');
    const fromBlock = document.getElementById('from-block');
    const toBlock = document.getElementById('to-block');

    if (swapBtn) {
        swapBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Swap text values
            const fromCity = document.getElementById('from-city');
            const fromAirport = document.getElementById('from-airport');
            const toCity = document.getElementById('to-city');
            const toAirport = document.getElementById('to-airport');

            const tempCity = fromCity.textContent;
            const tempAirport = fromAirport.textContent;

            fromCity.textContent = toCity.textContent;
            fromAirport.textContent = toAirport.textContent;

            toCity.textContent = tempCity;
            toAirport.textContent = tempAirport;

            // Trigger animation on swap button
            swapBtn.style.transform = swapBtn.style.transform === 'rotate(180deg)' ? 'rotate(360deg)' : 'rotate(180deg)';
        });
    }

    // 4. One Way / Round Trip Toggle
    const tripRadioOneWay = document.getElementById('trip-oneway');
    const tripRadioRound = document.getElementById('trip-round');

    if (tripRadioOneWay && tripRadioRound) {
        const toggleReturnState = () => {
            if (tripRadioOneWay.checked) {
                returnBlock.style.opacity = '0.5';
                returnVal.textContent = 'Tap to Add';
                returnSub.textContent = 'Save more on round trips';
            } else {
                returnBlock.style.opacity = '1';
                returnVal.textContent = '12 Jun';
                returnSub.textContent = 'Friday, 2026';
            }
        };

        tripRadioOneWay.addEventListener('change', toggleReturnState);
        tripRadioRound.addEventListener('change', toggleReturnState);
    }

    // 5. Travellers & Class Dropdown Logic
    const travellersBlock = document.getElementById('travellers-block');
    const travellersDropdown = document.getElementById('travellers-dropdown');

    if (travellersBlock && travellersDropdown) {
        travellersBlock.addEventListener('click', (e) => {
            e.stopPropagation();
            travellersDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!travellersBlock.contains(e.target)) {
                travellersDropdown.classList.remove('active');
            }
        });
    }

    // Passenger Increment/Decrement Counters
    const updatePassengerCount = () => {
        const adults = parseInt(document.getElementById('count-adults').textContent);
        const children = parseInt(document.getElementById('count-children').textContent);
        const infants = parseInt(document.getElementById('count-infants').textContent);
        const total = adults + children + infants;

        const activeClass = document.querySelector('.class-pill.active').textContent;

        const travellersVal = document.getElementById('travellers-val');
        const travellersSub = document.getElementById('travellers-sub');

        travellersVal.textContent = `${total} Traveller${total > 1 ? 's' : ''}`;
        travellersSub.textContent = activeClass;
    };

    const counterBtns = document.querySelectorAll('.counter-btn');
    counterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = btn.getAttribute('data-target');
            const action = btn.getAttribute('data-action');
            const counterElement = document.getElementById(targetId);
            let val = parseInt(counterElement.textContent);

            if (action === 'increase') {
                val++;
            } else if (action === 'decrease') {
                if (targetId === 'count-adults' && val > 1) {
                    val--;
                } else if (targetId !== 'count-adults' && val > 0) {
                    val--;
                }
            }

            counterElement.textContent = val;

            // Enable/disable decrease button if minimum reached
            const decBtn = btn.parentElement.querySelector('[data-action="decrease"]');
            if (targetId === 'count-adults') {
                decBtn.disabled = (val <= 1);
            } else {
                decBtn.disabled = (val <= 0);
            }

            updatePassengerCount();
        });
    });

    // Class selection pills
    const classPills = document.querySelectorAll('.class-pill');
    classPills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            e.stopPropagation();
            classPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            updatePassengerCount();
        });
    });

    // 6. Login Modal Trigger
    const loginBtn = document.getElementById('nav-login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (loginBtn && loginModal && closeModalBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
        });

        closeModalBtn.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });

        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }

    // 7. Search Action, Loading Screen, and Drawer results
    const btnSearch = document.getElementById('btn-search');
    const resultsDrawer = document.getElementById('results-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');
    const searchLoader = document.getElementById('search-loader');
    const searchResults = document.getElementById('search-results');

    if (btnSearch && resultsDrawer && closeDrawerBtn) {
        btnSearch.addEventListener('click', () => {
            // Read search values for results header
            const fromCityName = document.getElementById('from-city').textContent;
            const toCityName = document.getElementById('to-city').textContent;
            const routeText = document.getElementById('route-text');
            
            if (routeText) {
                routeText.textContent = `${fromCityName} to ${toCityName}`;
            }

            // Open Results Drawer
            resultsDrawer.classList.add('active');
            
            // Show Loader and hide content first
            searchLoader.style.display = 'flex';
            searchResults.style.display = 'none';

            // Simulate flight search loading
            setTimeout(() => {
                searchLoader.style.display = 'none';
                searchResults.style.display = 'block';
            }, 2000);
        });

        closeDrawerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            resultsDrawer.classList.remove('active');
        });
    }

    // 8. Offers Filtering
    const offerTabBtns = document.querySelectorAll('.offer-tab-btn');
    const offerCards = document.querySelectorAll('.offer-card');

    offerTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            offerTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            offerCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 9. Coupon Copying Action
    const copyBtns = document.querySelectorAll('.coupon-copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.offer-card');
            const code = card.querySelector('.coupon-code').textContent;

            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'COPIED!';
                btn.style.color = '#10b981';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy coupon: ', err);
            });
        });
    });
});
