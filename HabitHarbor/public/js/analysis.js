function toggle(component, clickedBtn) {
    const buttons = document.querySelectorAll('.switch-container');
    const components = document.querySelectorAll('.content > div');

    buttons.forEach(btn => {
        if (btn === clickedBtn) {
            btn.classList.add('active'); // Add active class to clicked button
        } else {
            btn.classList.remove('active'); // Remove active class from other buttons
        }
    });

    components.forEach(comp => {
        if (comp.classList.contains(component)) {
            if (component === "history") {
                comp.style.display = 'grid';
                comp.style.gridTemplateColumns = '1fr 1fr';
                comp.style.gridTemplateRows = '0.2fr 0.9fr 0.2fr 1fr 0.2fr 1.4fr';
                comp.style.gap = '10px 10px';
                comp.style.gridAutoFlow = 'row';
                comp.style.gridTemplateAreas = `
                    "title title"
                    "daily-challenges daily-challenges"
                    "ttitle ttitle"
                    "weekly-challenges weekly-challenges"
                    "Title Title"
                    "monthly-challenges monthly-challenges"
                `;
                comp.style.overflowY = 'auto'; // Enable scrolling only on this part
            }
            else{
                comp.style.display = 'block';
            }
        } else {
            comp.style.display = 'none';
        }
    });
}

