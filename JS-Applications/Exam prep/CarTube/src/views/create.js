import { html } from './../../node_modules/lit-html/lit-html.js'
import {createCar} from "../api/data.js";


export const createCarCard = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;

export function createCarPage(ctx) {
    ctx.render(createCarCard(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const brand = formData.get('brand').trim();
        const model = formData.get('model').trim();
        const description = formData.get('description').trim();
        const yearStr = formData.get('year').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const priceStr = formData.get('price').trim();

        const year = Number(yearStr);
        const price = Number(priceStr);


        if(brand === '' || model === '' || description === '' || imageUrl === '' || year < 0 || price < 0){
            return alert('All fields are required, Year and Price must be positive!')
        }

        await createCar({
            brand,
            model,
            description,
            year,
            imageUrl,
            price,
        });

        ctx.page.redirect('/listings');
    }
}

