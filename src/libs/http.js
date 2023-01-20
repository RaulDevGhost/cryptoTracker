class Http {
  // only one object of the same class - SIngleton - save rersourses
  static instance = new Http();

  //url image -> https://c1.coinlore.com/img/25x25/bitcoin.png

  url = 'https://api.coinlore.net/api/tickers/?limit=20';
  urlCoin = 'https://api.coinlore.net/api/ticker';
  urlLogo = 'https://c1.coinlore.com/img/25x25';
  urlMarkets = 'https://api.coinlore.net/api/coin/markets/?id=';

  get = async () => {
    try {
      let req = await fetch(this.url);
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http get method err', err);

      throw Error(err);
    }
  };

  getCoin = async id => {
    try {
      let req = await fetch(`${this.urlCoin}/?id=${id}`);
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http get method err', err);

      throw Error(err);
    }
  };

  getMarkets = async id => {
    try {
      let req = await fetch(`${this.urlMarkets}${id}`);
      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http get method err', err);

      throw Error(err);
    }
  };

  post = async body => {
    try {
      let req = await fetch(this.url, {
        method: 'POST',
        body,
      });

      let json = await req.json();

      return json;
    } catch (err) {
      console.log('http method post err', err);

      throw Error(err);
    }
  };
}

export default Http;
