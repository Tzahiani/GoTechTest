import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { expect } from 'chai';


import restaurantsAPI from '../logic/REST/restaurantsAPI';

describe('Restaurants tests', () => {

    before('Reset restaurant server', async () => {
        //Arrange
        await restaurantsAPI.resetServer();
    })

    it('Validate the amount of restaurants', async () => {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

        //Assert
        expect(restaurants.success).to.be.true;
        const actualAmount = restaurants.data?.length;
        expect(actualAmount).to.equal(3, 'Restaurants amount is not as expected');
    })

    it('Get restaurant by id', async () => {
        //Arrange
        const myNewRest = { address: "My Addess 1", id: 233, name: "My Restaurant", score: 2.3 };
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);

        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233);

        //Assert
        expect(getByIdResponse.status).to.equal(200);
        expect(getByIdResponse.success).to.be.true;
        expect(getByIdResponse.data).to.deep.equal(myNewRest);
    })

    it('Get non exsisting restaurant', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(233);

        //Assert
        expect(getByIdResponse.error).to.equal("restaurant with given id not found");
        expect(getByIdResponse.success).to.be.false;
        expect(getByIdResponse.status).to.equal(404);
    })

    it('Delete exsisting restaurant', async () => {
        //Act
        const delByIdResponse = await restaurantsAPI.delRestaurantById(233);

        //Assert
        expect(delByIdResponse.status).to.equal(204);
    })

    it('Add new restaurant', async () => {
        //Act
        const myNewRest = { address: "My Addess 1", id: getRandomInt(100), name: "My Restaurant", score: 2.3 };
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);
        //Assert
        expect(createResponse.status).to.equal(201);
        expect(createResponse.success).to.be.true;
    })
    it.only('Check score in a number', async () => {
        //Act
        const getByIdResponse = await restaurantsAPI.getRestaurantById(59);
        const result = JSON.parse(JSON.stringify(getByIdResponse));
        //Assert
        expect(getByIdResponse.status).to.equal(200);
        expect(getByIdResponse.success).to.be.true;
        expect(result.data.score).to.be.a('number');
    })
})

function getRandomInt(maxInt: number) {
    var min = Math.ceil(1);
    var maxNum = Math.floor(maxInt);
    return Math.floor(Math.random() * (maxNum - min) + min);
}