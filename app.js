// Server Set-up
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//render the home page
app.get('/', (req, res) => 
{
  res.render('index');
});

// Route to fetch all of the cocktail information from the cocktailDB API
app.get('/random-cocktail', async (req, res) => 
{
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = response.data.drinks[0];
    console.log(cocktail);
    //render the cocktail results to cocktailresults.ejs
    res.render('cocktailresults', { cocktail });
    //render error message just in case
  } catch (error) {
    res.render('error', { message: "Error fetching cocktail. Try again!" });
  }
});

//start the server
app.listen(3000, () => 
{
  console.log('website is running on port 3000');
});