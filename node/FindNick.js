const axios = require('axios');
const cheerio = require('cheerio');

const server = '';
const nick = '';

async function searchRankingForNick(server, nick) {
  let page = 1;
  let found = false;

  while (!found && page <= 300) {
    const url = `https://www.margonem.pl/ladder/players,${server}?page=${page}&s=${Date.now()}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    $('table > tbody > tr > td.long-clan > a').each((index, element) => {
      const playerNick = $(element).text().trim();
      if (playerNick === nick) {
        console.log(`Znalazłem ${nick} na stronie ${page}, i pozycji ${index + 1}`);
        found = true;
      }
    });
    console.log(`Aktualnie sprawdzam: ${page}`)
    page++;
  }

  if (!found) {
    console.log(`Nie znalazłem: ${nick} na ${server}`);
  }
}
searchRankingForNick(server, nick);
