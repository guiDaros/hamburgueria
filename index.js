/*const express = require('express')
const app = express()
const uuid = require('uuid')

app.listen(3000, () => {
    console.log(`🚀 server started on port 3000`)
})

const orders = []

const requestMiddleware = (request, response, next) => {
    const method = request.method
    const url = request.url

    console.log(`Method: ${method} / Url: ${url} `)

    next()
}
 
const checkUserId = (request, response, next) => {
    const id = request.params.id

    const index = orders.findIndex(order => order.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id
    next()
}

app.get('/users',requestMiddleware, (request, response) => {
    return response.json(orders)
})

app.get('/users/:id', checkUserId, requestMiddleware, (request, response) => {
    const index = request.userIndex;
  
    if (index >= 0) {
      const order = orders[index];
      return response.json(order);
    } else {
      return response.status(404).json({ error: "Order not found" });
    }
});
  
app.use(express.json());


app.post('/users',requestMiddleware, (request, response) => {
    const { clientName, order, price } = request.body
    const id = uuid.v4()
    const status = 'Em preparacao'

    const completeOrder = { id, order, clientName, price, status }

    orders.push(completeOrder)

    return response.status(201).json(orders)
})

app.put('/users/:id', checkUserId,requestMiddleware, (request, response) => {
    const { clientName, order, price } = request.body;
    const id = request.userId
    const index = request.userIndex

    const status = 'Pronto!'

    const updatedOrder = { id, order, clientName, price, status };

    orders[index] = updatedOrder;

    return response.json(updatedOrder);
});

app.patch('/users/:id', checkUserId,requestMiddleware, (request, response) =>{
    const index = request.userIndex

    orders[index].status = "Pronto"
    
    return response.json(orders[index])
})

app.delete('/users/:id', checkUserId,requestMiddleware, (request, response) => {
    const id = request.userId
    const index = request.userIndex

    orders.splice(index, 1)

    return response.status(204).json()
})
*/

const express = require('express');
const app = express();
const uuid = require('uuid');

app.listen(3000, () => {
    console.log('🚀 server started on port 3000');
});

const orders = [];
const requestMiddleware = (require, response, next) => {
    console.log(`Method: ${require.method} / Url: ${require.url}`);
    next();
};

const checkUserId = (require, response, next) => {
    const id = require.params.id;
    const index = orders.findIndex(order => order.id === id);

    if (index < 0) {
        return response.status(404).json({ error: 'Order not found' });
    }

    require.userIndex = index;
    require.userId = id;
    next();
};

app.use(express.json());

app.get('/users', requestMiddleware, (require, response) => {
    return response.json(orders);
});

app.get('/users/:id', checkUserId, requestMiddleware, (require, response) => {
    const index = require.userIndex;

    if (index >= 0) {
        const order = orders[index];
        return response.json(order);
    } else {
        return response.status(404).json({ error: 'Order not found' });
    }
});

app.post('/users', requestMiddleware, (require, response) => {
    const { clientName, order, price } = require.body;
    const id = uuid.v4();
    const status = 'In preparation';
    const completeOrder = { id, order, clientName, price, status };

    orders.push(completeOrder);
    return response.status(201).json(orders);
});

app.put('/users/:id', checkUserId, requestMiddleware, (require, response) => {
    const { clientName, order, price } = require.body;
    const id = require.userId;
    const index = require.userIndex;
    const updatedOrder = { id, order, clientName, price };
    orders[index] = updatedOrder;

    return response.json(updatedOrder);
});

app.patch('/users/:id', checkUserId, requestMiddleware, (require, response) => {
    const index = require.userIndex;
    orders[index].status = 'Ready';
    
    return response.json(orders[index]);
});

app.delete('/users/:id', checkUserId, requestMiddleware, (require, response) => {
    const index = require.userIndex;
    orders.splice(index, 1);

    return response.status(204).json();
});





