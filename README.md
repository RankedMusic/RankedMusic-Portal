# RankedMusic-Portal

NOTE: Find and kill adddress already in use
1. Type `lsof -i :<PORT>` in terminal
2. Find PID and type `kill -9 <PID>`

To start on instance:
1. Transfer to instance
2. Start frontend and back end normally
3. Make sure http-common is set to ec2 instance
Link: http://ec2-3-15-26-27.us-east-2.compute.amazonaws.com:3000/login


Ssh into instance:
ssh nashsolon@ec2-3-15-26-27.us-east-2.compute.amazonaws.com

Nash Journal (June 30th):
- Created script to update comments, likes, and views based on command line arguments
    - Input as many links as you want after `node _____args.js` and the script will update values for  the specific links
- get_campaign_totals.js file and format mongoDB database for campaign totals (to make graphs)
- (Saturday)
    - Spent time maintaining views counter
    - Problem with XPaths. I think tiktok may be changing website at some points
    - NOTE: Try to run every scraper everyday in the morning from now on to make sure they work.
    - UPDATE: Comments and likes scraper worked perfectly. Just needed to maintian the views scraper
- Researched different chart libraries in javascript and specificically their compatibility with React
    - Found recharts
    - Started process to use recharts
        - First, had to create another database inside our project
        - Formatted historicals_DB
        - historical_views
            - Object with campaignId, campaign_name, and array of objects that have a date and a total view count
            - When you run get_campaign_totals.js, the file adds another object addition to the array
            - NOTE: Run update_views.js, then get_campaign_totals.js because the latter pulls from the database, not scraping the data
- Views scraping is the biggest PITA fucking ever
    - Manual views scraping
        - Like the video on Ranked Music account and manually update view count
        - When influencer is added, add the video to a list and add liked field = false
    - Get around captchas (seemingly a lot) I don't think this is possible
    - Hide from captchas (look for ways to hide software)
    - Views scraping now working with 30 second timeout before any scrolling happens

Nash(July 7)
- Want to add date updated (in MongoDB possibly on website) for views, likes, and comments

    
    

Components:
- Updating single values (NASH)
- We need a deliverable for the client - External Page (Kyle)
- Recording Historical Data (Nash)
- Graphical Representations (Both)



To-Do


    Must Get Done
        * Edit Campaigns
        * Get on Server



    Prior to Meeting
        * matching colors and images to slides
        * Adding whatever react effects/css can get to
        * make a table??


Longterm goals
    * Secure login/password
    * on Refresh stay logged in

Cool to add

    Front-End
        * Appearance based on images/slides
        * Make off campus for menu bar
        * Add overlay or popovers or tooltips for info on components
        * Add Progress bar for data
        * Spinner on page load
        * Reformat forms


    Back-End
        * Secure login
        * Make sure cant access other pages when not logged in
   