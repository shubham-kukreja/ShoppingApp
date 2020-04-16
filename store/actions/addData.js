const axios = require("axios");

async function postReq() {
  const res = await axios.post(
    "https://reactnative-e8f5b.firebaseio.com/products.json",
    {
      title: "Coffee Mug",
      imageUrl:
        "https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg",
      description: "Can also be used for tea!",
      price: 8.99,
    }
  );
  console.log(res);
}

postReq();
