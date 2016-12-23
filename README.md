# bagratinho.github.io

INTRODUCTION TO LOG LIST APP
----------------------------

ENVIRONMENT
-----------

Technologies used: 

React - for UI
Reflux - for unidirrectional data flow
Webpack - for module bundling
Babel - for compilling ES6 and JSX
Mocha, Enzyme, Chai, Jsdom - for unit testing
LESS - as css famework

Other libs: underscore.js, normalize.css, react-google-charts, react-router

TASK DESCRIPTION
----------------

Prepare app for displaying a list of items

Which can be 2 types: Build and Firewall
Items have common and different properties.

Each item in the list can be expaned, showing additional details.
Additional details can further be expended by a modal (modal implemented partially as described by assignment).

When expending an item, others shall collapse (accordion functionality).

PACKAGE CONTENT
---------------

build/
	index.html
src/
	css/
		css.less
		fonts.css
	js/
		actions/
			itemListActions.jsx	
		components/
			buildOverview.jsx
			finalOverview.jsx
			home.jsx
			item.jsx
			itemDeepDetails.jsx
			itemDetail.jsx
			itemList.jsx
			main.jsx
			metricsOverview.jsx
			modal.jsx
			testOverview.jsx
		data/
			itemList.js
			structure.js
		stores/
			expendedItemStore.js
			itemListStore.js
			modalStore.js
			structureStore.js
		index.jsx
		routes.jsx	
test/
	helpers/
		browser.js
	test.spec.js
.babelrc
package.json
webpack.config.js

BUSINESS LOGIC
--------------

As its visible from webpack config, app entry point is src/js/index.jsx file which renders a react-router component with src/js/routes.jsx component inside and loads stiles..

In routes.jsx file we define the only route of our (yet one page) app, which is components/home.jsx component with main.jsx component as its index route.

Main.jsx itselfs only loads the Modal component ItemList component. This is the real entry point of our app.

ItemList component initially renders with its state equal to { tableStructure: [], itemList: [], loading: 1, expID: 0,  }
and this means that it will have nothing to display but a loading progress bar. After components mounting it triggers actions to get structure of the table and get the data to display. 

All actions that possible are defined in actions/itemListActions.js.

The respective stores are subscribed to listen those actions, and they return json data for table structure and for the items list once the respective actions triggered - stores/itemListStore.js , stores/structureStore.js.

ItemList components (from the moment that its mounted) is subscribed to listen to those stores described above, which makes possible to receive the data from those stores and pass them to handler methods.

Those handler methods are updateing ItemList components state which couses the component to rerender itself.
Once the structure received, and the state is updated a respective function draws table headings.
Once the data is received, its being rendered by other responsible function, and as a result the loading bar is being changed by the list of items or with no items message if the data is empty. 

This is achived using Reflux and its "listenTo", "listenables" mixins.

By default the detail views of items are not rendered (not hidden by css, not in markup). Cause all of them have a property isExp equal to false.
The responsible part for this is the expID property in ItemList state. It point to the id of the item which shall be oppened, and its equal to 0 if none of the items is opened (and its 0 by default). 

Upon data, ItemList is rendering a list of Item components, by passing some properties to them fro  the data received from store.
And Item component takes care of its visualisation upon those props. 

Item component has a onClick function attached to its root element which triggers an action from itemListIcons, the action is being listened by expendedItemStore. 

ItemList component, upon its mount, is subscribed to listen to changes from expended item store, which translates the information about the id of the item which is expended. ItemList updates its state expID variable which causes the component to rerender, and as expID is no longer 0 the respective Item with respective id will get a property stating that it should be expended, which will cause it to rerender itself with expended details - ItemDetail component.

Each of the detail blocks in the ItemDetail component has a onClick handler which generates an action to open the modal (which is not final at the moment). This is achived with same action -> store -> component flow.

NOTE: for serving data and structure the dummy javascript objects are used, which must be leter changed with a REST API calls for real business model. For now there is 2 seconds delay implemented with setTimeout to simulate JSON data download.

JSON DATA FORMAT EXAMPLE FOR SINGLE ITEM
----------------------------------------

	{
		id: 6,
		type: "build",
		name: "Tenrox",
		status: "Failed",
		started: "10/12/2016",
		details: [
			{
				label: "Metrics",
				status: "Complete",
				items: [
					{
						label: "Test",
						value: 64,
						trend: 1
					},
					{
						label: "Maintainability",
						value: 64,
						trend: 0
					},
					{
						label: "Security",
						value: 64,
						trend: 1
					},
					{
						label: "Workmanship",
						value: 64,
						trend: 0
					},
				]
			},
			{
				label: "Build",
				status: "Complete",
				date: "10/12/2016"
			},
			{
				label: "Unit Test",
				status: "Failed",
				chartData: [
					{
						label: "passed",
						value: 100
					},
					{
						label: "failed",
						value: 450
					}
				],
				code_covered_prc: 76
			},
			{
				label: "Functional Test",
				status: "Pending"
			}
		]
	}


ADDITIONAL
----------

React Google Charts wrapper component is used for drawing pie charts in expended item view.

INSTALLATION
------------
Requires node and npm installed. It can take some time downloading all dependencies.

$ cd log_list_app
$ npm install

UNIT TESTS
----------

$ npm run test

PRODUCTION BUILD
----------------

$ npm run build

Then go to build folder and open index.html file inside with prefered browser.

DEVELOPMENT BUILD
-----------------
Requires webpack-dev-server

$ npm run start 

Content is served from localhost:8080

ADDITIONAL
----------

Production build is available online by following URL https://bagratinho.github.io
