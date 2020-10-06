# BuyingPowerBE


This is my API for a personal project I am working on called Buying Power. I am updating it periodically as I add more functionality but right now this app does the following:
<ul> 
  <li>Exchange Rates</li>
  <li><span> Using a drop down selector the react app uses fetch to get the exchange rate for the selected currency</span></li>
  <li>Color Coded Buying power chart</li>
</ul>

This application has posed a few issues that I am currently solving and working around. So far here is what I've done.

<h4>External API Response</h4>
Using Frankfurter's API for currencies I can simply get the exchange rate for most of the major currencies. However the API response has the 
currency as the key and the rate as the value with no labels. I built a method to turn this JSON object into an array of seperate objects so that the React app can quickly map them within the component. 

<h4>Adding currencies to counties for the map component</h4>

I have a PostgresSQL database with every country and its currency code, continent, and capital city. I am going to build a method that uses an algorithm to find the currency code and add the exchange rate to the country before it is sent as a response to the react app. 
