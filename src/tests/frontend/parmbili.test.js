const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

/* Unit test chrome options setup */
const screen = {width: 1280, height: 900 };
let chrome_options = new chrome.Options().windowSize(screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
chrome_options.addArguments("--headless"); 
chrome_options.addArguments("--disable-gpu");
chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 

/**
* Run using: NODE_ENV=development ./node_modules/.bin/mocha src/tests/frontend/*.test.js
*/
describe('Parmbili testcase', function() {
    this.timeout(150000)
    let driver
    
    before(async function(){
        driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(chrome_options)
                .build(); 

        await driver.get("http://localhost:3000/");
    });

    beforeEach(async function() {
        await driver.sleep(1000);
    });  

    after(async function() {
        await driver.quit();
    });

    /* Red */
    it("Should not be able to expand land", async function (){
        let expand_land_button = "expand_land_button";
        let last_tile_item = ".tile_item:nth-child(25)";

        await driver.findElement(By.id(expand_land_button)).click();
        {   
            const elements = await driver.findElements(By.css(last_tile_item)); 
            assert(elements.length);
        }
    });

    /* Red */
    it('Should not be able to show "Plant" overlay', async function(){
        let tile_item = ".tile_item";
        let overlay_button = ".overlay_button";

        await driver.findElement(By.css(tile_item)).click();
        assert(await driver.findElement(By.css(overlay_button)).getText() === "Plant");
        await driver.findElement(By.css(tile_item)).click();
    });

    /* Green */
    it("Toggle overlay", async function (){
        let tile_item = ".tile_item:nth-child(1)";
        let popover_container = "popover-container";

        await driver.findElement(By.css(tile_item)).click();
        {
            const elements = await driver.findElements(By.id(popover_container));
            assert(elements.length);
        }
        await driver.findElement(By.css(tile_item)).click();
        await driver.sleep(1000);
        {   
            const elements = await driver.findElements(By.id(popover_container)); 
            assert(!elements.length);
        }
    });

    /* Green */
    it('Show overlay for tilling a tile', async function() {
        let tile_item = ".tile_item:nth-child(1)";
        let overlay_button = ".overlay_button";

        await driver.findElement(By.css(tile_item)).click()
        assert(await driver.findElement(By.css(overlay_button)).getText() === "Till");
    });

    /* Green */
    it('Till a tile', async function() {
        let overlay_button = ".overlay_button";
        let tilled_tile = ".tilled";

        await driver.findElement(By.css(overlay_button)).click();
        {
            const elements = await driver.findElements(By.css(tilled_tile));
            assert(elements.length);
        }
        await driver.findElement(By.css(tilled_tile)).click();
    });

    /* Green */
    it('Show "Plant" overlay', async function(){
        let tile_item = ".tile_item";
        let overlay_button = ".overlay_button";

        await driver.findElement(By.css(tile_item)).click();
        assert(await driver.findElement(By.css(overlay_button)).getText() === "Plant");
    });

    /* Green */
    it('Show, close/cancel plant crop modal', async function(){
        let overlay_button = ".overlay_button";
        let show_plant_modal = "show_plant_modal";
        let close_button = ".modal-body .close_button";
        let cancel_button = ".action_container button[type=button]";

        await driver.findElement(By.css(overlay_button)).click();
        {
            const elements = await driver.findElements(By.id(show_plant_modal));
            assert(elements.length);
        }
        await driver.findElement(By.css(close_button)).click();

        await driver.findElement(By.css(overlay_button)).click();
        {
            const elements = await driver.findElements(By.id(show_plant_modal));
            assert(elements.length);
        }
        await driver.findElement(By.css(cancel_button)).click();
    });

    /* Green */
    it('Plant a crop', async function(){    
        let modal_submit_button = ".action_container button[type=submit]";
        let tilled_tile = ".tile_item.tilled";
        let planted_tile = ".tile_item.planted";
        let earning_value_text = "earning_value";

        let earning_value = await driver.findElement(By.id(earning_value_text)).getText();

        await driver.findElement(By.css(tilled_tile)).click();
        await driver.findElement(By.css(".overlay_button")).click();
        await driver.findElement(By.css(".potato_icon")).click();
        await driver.findElement(By.css(modal_submit_button)).click();
        await driver.sleep(1000);

        /* Check if modal visibility is none */
        {
            const elements = await driver.findElements(By.id("show_plant_modal"));
            assert(!elements.length);
        }
        /* Check if modal visibility is none */
        {
            const elements = await driver.findElements(By.css(planted_tile));
            assert(elements.length);
        }

        let new_earning_value = await driver.findElement(By.id(earning_value_text)).getText();

        /* Assert if earning value decrease as an expense to planting a crop */
        assert(parseInt(earning_value) > parseInt(new_earning_value));
    });

    /* Green */
    it('Harvest a plant', async function(){    
        let harvest_tile = ".tile_item.harvest";
        let tile_item = ".tile_item";
        let earning_value_text = "earning_value";
        let overlay_button = ".popover-body .overlay_button";

        let earning_value = await driver.findElement(By.id(earning_value_text)).getText();

        await driver.wait(until.elementLocated(By.css(harvest_tile)), 30000);
        await driver.findElement(By.css(harvest_tile)).click();
        await driver.findElement(By.css(overlay_button)).click();
        await driver.findElement(By.css(tile_item)).click();
        
        let new_earning_value = await driver.findElement(By.id(earning_value_text)).getText();

        /* Assert if earning value increase  after harvesting */
        assert(parseInt(earning_value) < parseInt(new_earning_value));
    });

    /* Green */
    it('Show remove crop modal and accept remove', async function(){
        let modal_submit_button = ".action_container button[type=submit]";    
        let empty_tile = ".tile_item.empty";
        let planted_tile = ".tile_item.planted";
        let overlay_button = ".popover-body .overlay_button";
        let onion_option = ".modal-body .onion_icon";
        let modal_remove_button = ".modal-body .remove_button";

        /* Click Empty Tile */
        await driver.findElement(By.css(empty_tile)).click();
        /* Click Till overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click Plant overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click onion option in modal*/
        await driver.findElement(By.css(onion_option)).click();
        /* Click submit button of modal */
        await driver.findElement(By.css(modal_submit_button)).click();
        await driver.sleep(1000);
        /* Click Planted Tile */
        await driver.findElement(By.css(planted_tile)).click();
        /* Click remove overlay */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click remove button in modal */
        await driver.findElement(By.css(modal_remove_button)).click();
    });

    /* Green */
    it('Get rich and expand to land 5 x 5', async function(){
        let overlay_button = ".popover-body .overlay_button";
        let corn_option = ".modal-body .corn_icon";
        let modal_submit_button = ".modal-body .action_container button[type=submit]";
        let harvest_tile = ".tile_item.harvest";
        let last_tile_item = ".tile_item:nth-child(25)";

        /* Plant first crop */
        /* Click Empty tile (16th)*/
        await driver.findElement(By.css(".tile_item:nth-child(16)")).click();
        /* Click Till overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click Plant overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click corn option in modal */
        await driver.findElement(By.css(corn_option)).click();
        /* Click submit button of modal */
        await driver.findElement(By.css(modal_submit_button)).click();

        /* Wait until crop can be harvested */
        await driver.wait(until.elementLocated(By.css(harvest_tile)), 61000);
        /* Click tile with harvest class then click pop over harvest button */
        await driver.findElement(By.css(harvest_tile)).click();
        await driver.findElement(By.css(".popover-body button:nth-child(1)")).click();

        /* Plant second crop */
        /* Click Till overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click Plant overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click corn option in modal */
        await driver.findElement(By.css(corn_option)).click();
        /* Click submit button of modal */
        await driver.findElement(By.css(modal_submit_button)).click();

        /* Plant third crop */
        await driver.findElement(By.css(".tile_item:nth-child(15)")).click();
        /* Click Till overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click Plant overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        /* Click corn option in modal */
        await driver.findElement(By.css(corn_option)).click();
        /* Click submit button of modal */
        await driver.findElement(By.css(modal_submit_button)).click();

        let tile_order_number = 16;
        for(let action_index=0; action_index<2; action_index++){
            /* Wait until tile is ready to harvest then click it. */
            await driver.wait(until.elementLocated(By.css(harvest_tile)), 61000);
            await driver.findElement(By.css(`.tile_item:nth-child(${tile_order_number})`)).click();
            await driver.sleep(1000);
            await driver.findElement(By.css(".popover-body button:nth-child(1)")).click();
            tile_order_number--;
        }

        /* Expand the land to 5x5 */
        await driver.findElement(By.id("expand_land_button")).click();

        /* Check if the 25th tile exist */
        {   
            const elements = await driver.findElements(By.css(last_tile_item)); 
            assert(elements.length);
        }
    });
});
