# Delve
## A comprehensive loot tracker for your D&D or other D20 based fantasy games.

![Delve Welcome Screen](https://i.imgur.com/XWLMXb1.png)


------------------------------------------------

## Installation

* Install dependencies from root directory

```pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt```

* Create a **.env** file using the following template:

>FLASK_APP=app
>FLASK_ENV=development
>SECRET_KEY=((Insert your own secret key here))
>DATABASE_URL=postgresql://((Admin Username)):((Admin Password))@((Host Address))/((Database Name))

* Set up a PostgreSQL database with the username, password and databse name that you used in the **.env** file.

* Follow this squence to go into the pipenv shell and migrate, then seed the database:

```pipenv shell```

```flask db upgrade```

```flask seed all```

```flask run```

* Once you have the database set up and the flask app running, you should be able to install the react app and run it to connect to the backend. On a new terminal, change from the root directory into the **./react-app** directory and run the following:

```npm install```

* Once dependencies are installed, create a **.env** file here with the following template:

>REACT_APP_BASE_URL=((Host Address, such as http://localhost:5000))

* You should be able to run the following:

```npm start```

* If successful, navigating to the address in the react app **.env** file in a browser should show the welcome page!

-------------------------------------------
## How to use Delve

Delve is fairly simple in its operation by design. When at the welcome screen you will be greeted with a familiar sight of a **Log In** prompt as well as a **Sign Up** prompt - if you do not have an account in the databse you will need to do the latter.

*Image Placeholder*

Once you have logged in you will be taken to the main menu - on the left side you will see a sidebar if you're running the app on a computer, otherwise you will see a hamburger menu in the top left on mobile. This side menu contains all of the parties you have created using Delve - if you have none, all you will see is the option to create one.

*Image Placeholder*

After creating, then selecting a party, you will be at the main menu for the party. On the side menu now you will have several options - the option to add party members, the option to select already added party members, the ability to delete the party, as well as the party report.

*Image Placeholder*

Before I get into the report, you'll see on the right is a list of all items you have added. Adding an item is simple - you just need to choose "**Add Item**", put in a name, a description, choose a category, then fill in how much the item is worth. When you click "Add" on the item screen it will then add it to the inventory! This will automatically add it to the inventory of a party member if you have one selected, otherwise it will go to the party loot.

*Image Placeholder*

You will also see under the items on the party and/or member pages that there is a listing for the liquid wealth, as well. Delve keeps track of this, along with the value of each item you store. By hitting "**Desposit**" or "**Withdraw**" you will be able to add or subtract the different Platinum, Gold, Silver and Copper values from your party or party members. Yes, you can go negative. I won't try to tell you how to run your games!

*Image Placeholder*

If you want to change who owns a piece of loot, edit the values, name, or description of a piece of loot, or delete it, you simply click on the "**Details**" button to the right of an item and you will find you can edit all of these values.

*Image Placeholder*

Now that I've covered the basics of Delve's operation, the Party Report will make a little more sense. The party report is a screen that collects and displays the following data:

* Each party member's Liquid and Material wealth.
* The party's unclaimed Liquid and Material wealth.
* The average amount each party member should be worth if the party is at an even split of the loot.
* The total wealth of the party, including the liquid and material wealth of each member.

I calculated the average by taking the total wealth and dividing it by the number of party members + 1, because I find it's best practice to leave party funds open for expenses that benefit all, but that's just how I've done things in the past.

*Image Placeholder*

And that's it, really! You now know all there is to Delve in its current iteration. I plan on updating this ReadMe as new features are added in the future.

Happy Delving!

-----------------------
