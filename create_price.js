const stripe = require('stripe')('sk_test_51MmB0kJM8OyuHugkBz4HaWDPa6lB4mgE44MCXRVnsLNo1hxPMD3zHG9ErrXRaZ2hAlpFi68DpAAXxeuKqe1lOxxI00J0FzAMvd');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your starter subscription price id: ' + price.id);
  });
});
