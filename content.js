function addNotInterestedButton() {
    const tweets = document.querySelectorAll('[data-testid="tweet"]');
  
    tweets.forEach(tweet => {
      if (!tweet.querySelector('.not-interested-btn')) {
        const btn = document.createElement('button');
        btn.innerText = 'Not Interested';
        btn.className = 'not-interested-btn';
        btn.onclick = async () => {
          const moreButton = tweet.querySelector('[aria-label="More"]');
          if (moreButton) {
            moreButton.click();
  
            // Wait for the menu to appear and click "Not interested in this"
            const checkMenu = setInterval(() => {
              const menuItems = document.querySelectorAll('[role="menuitem"]');
              let menuClicked = false;
              menuItems.forEach(item => {
                if (item.innerText.includes('Not interested in this') && !menuClicked) {
                  item.click();
                  menuClicked = true;
                  clearInterval(checkMenu);
  
                  // Debugging: Log to ensure the first click happened
                  console.log('Clicked "Not interested in this"');
  
                  // Wait for the feedback options to appear and click "This post isn't relevant"
                  setTimeout(() => {
                    const feedbackItems = document.querySelectorAll('button.css-175oi2r.r-xyw6el.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l');
                    feedbackItems.forEach(feedbackItem => {
                      if (feedbackItem.innerText.includes("This post isn’t relevant")) {
                        feedbackItem.click();
  
                        // Debugging: Log to ensure the second click happened
                        console.log('Clicked "This post isn’t relevant"');
                      }
                    });
                  }, 500); // Adjust the timeout as needed to ensure the feedback options are fully loaded
                }
              });
            }, 50); // Check every 50ms for the menu to appear
          }
        };
  
        // Position the button in the top right corner of the tweet
        tweet.style.position = 'relative';
        tweet.appendChild(btn);
      }
    });
  }
  
  const observer = new MutationObserver(addNotInterestedButton);
  observer.observe(document.body, { childList: true, subtree: true });
  
  window.addEventListener('load', addNotInterestedButton);
  