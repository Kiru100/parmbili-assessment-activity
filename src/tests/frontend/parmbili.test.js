const chrome = require("selenium-webdriver/chrome");
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const { TIMEOUT_SPEED, ASSERT_DURATION, AUTO_HARVEST } = require("../../config/test_constants");

/* Unit test chrome options setup */
const screen = {width: 1280, height: 900 };
let chrome_options = new chrome.Options().windowSize(screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
chrome_options.addArguments("--headless"); 
chrome_options.addArguments("--disable-gpu");
chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 

/**
* DOCU: These testcases will test the parmbili features. <br>
* Run using: NODE_ENV=development ./node_modules/.bin/mocha src/tests/frontend/*.test.js
* @author Noel
*/
describe('Parmbili testcase', function() {
    this.timeout(TIMEOUT_SPEED.custom);
    let driver; 
    
    before(async function(){
        driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(chrome_options)
                .build(); 

        await driver.get("http://localhost:3000/");
    });

    beforeEach(async function() {
        await driver.sleep(TIMEOUT_SPEED.normal);
    });  

    after(async function() {
        await driver.quit();
    });


    /* ------------------------------------------------------------------- */
    /* -------------------------- Start of Functions --------------------- */
    /* ------------------------------------------------------------------- */

    /**
    * DOCU: Assert that an element is visible on the page. <br>
    * @param {string} element_to_assert - The element you want to assert.
    * @param {integer} duration - The amount of time to wait for the element to appear.
    * Last updated at: January 18, 2023
    * @author Noel
    */
    async function assertElement(element_to_assert, duration = ASSERT_DURATION.default){
        await driver.wait(until.elementLocated(By.css(element_to_assert)), duration);
        {
            const element = await driver.findElements(By.css(element_to_assert));
            assert(element.length);
        }
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(element_to_assert))), duration);
    }

    /**
    * DOCU: Asserts that the element is not present on the page <br>
    * @param {string} element_to_assert - The element you want to assert is not present.
    * Last updated at: January 18, 2023
    * @author Noel
    */
    async function assertNotPresentElement(element_to_assert){
        await driver.sleep(TIMEOUT_SPEED.fastest);
        {
            const element = await driver.findElements(By.css(element_to_assert)); 
            assert(!element.length);
        }
    }
    
    /**
    * DOCU: Asserts that the text of the element is equal to the expected text <br>
    * @param {string} element_to_assert - The element you want to assert the text of.
    * @param {string} expected_text - The text you want to assert.
    * Last updated at: January 18, 2023
    * @author Noel
    */
    async function assertText(element_to_assert, expected_text){
        await driver.wait(until.elementLocated(By.css(element_to_assert)), TIMEOUT_SPEED.faster);
        {
            assert(await driver.findElement(By.css(element_to_assert)).getText() === expected_text);
        }
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(element_to_assert))), TIMEOUT_SPEED.faster);
    }

    /**
    * DOCU: Automatically plant a crop to tile item. <br>
    * @param {string} overlay_button - The button that opens the overlay
    * @param {string} crop_option - The css selector for the crop option in the modal
    * @param {string} modal_submit_button - The submit button in the modal that appears when you click the Till
    * Last updated at: January 18, 2023
    * @author Noel
    */
    async function plantCrop(overlay_button, crop_option, modal_submit_button){
        /* Click Till overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        await assertElement(overlay_button);

        /* Click Plant overlay button */
        await driver.findElement(By.css(overlay_button)).click();
        await assertElement(crop_option);

        /* Click corn option in modal */
        await driver.findElement(By.css(crop_option)).click();
        await assertElement(modal_submit_button);

        /* Click submit button of modal */
        await driver.findElement(By.css(modal_submit_button)).click();
        await assertNotPresentElement(modal_submit_button);
    }

    
    /**
    * DOCU: Harvest a crop to tile item. <br>
    * @param {integer} tile_order_number - The order number of the tile item.
    * @param {string} harvest_button - The button that appears when you click on a tile item.
    * @param {string} overlay_button - The button that appears after you click the harvest button.
    * Last updated at: January 18, 2023
    * @author Noel
    */
    async function harvestCrop(tile_order_number, harvest_button, overlay_button){
        /* Click tile item */
        await driver.findElement(By.css(`.tile_item:nth-child(${tile_order_number})`)).click();
        await assertElement(harvest_button);

        /* Click harvest button */
        await driver.sleep(TIMEOUT_SPEED.faster);
        await driver.findElement(By.css(harvest_button)).click();
        await assertElement(overlay_button);
    }

    /* ------------------------------------------------------------------- */
    /* -------------------------- End of Functions ----------------------- */
    /* ------------------------------------------------------------------- */

    /* ------------------------------------------------------------------- */
    /* ------------------------ Start of Test Cases ---------------------- */
    /* ------------------------------------------------------------------- */

    /**
    * DOCU: (Expand land button, red) 1. Check if expanding land will work with insufficient fund. <br>
    * Expected test result: red 
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it("1. Should be able to expand land, but it should not work because of insufficient fund.", async function (){
        /* Click expand land button and assert if 25th tile exist. */
        await driver.findElement(By.id("expand_land_button")).click();
        await assertElement(".tile_item:nth-child(25)", ASSERT_DURATION.faster);
    });

    /**
    * DOCU: (Plant overlay) 2. Check if plant overlay will show if land is not tilled. <br>
    * Expected test result: red <br>
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it("2. Should be able to show plant overlay, but it should not show because the land is not yet tilled.", async function(){
        let tile_item = ".tile_item";

        /* Click element containing tile_item class then assert if overlay button's inner text is equal to "Plant"  */
        await driver.findElement(By.css(tile_item)).click();
        await assertText(".overlay_button", "Plant");

        /* Click element containing tile_item class. */
        await driver.findElement(By.css(tile_item)).click();
        await assertElement(tile_item);
    });

    /**
    * DOCU: (Tile Overlay) 3. Check if tile overlay toggle function works. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it("3. Toggle tile overlay functionality.", async function (){
        let tile_item = ".tile_item:nth-child(1)";
        let overlay_button = ".overlay_button";

        /* Click first tile to show overlay. */
        await driver.findElement(By.css(tile_item)).click();
        await assertElement(overlay_button);

        /* Click the tile again to hide the overlay */
        await driver.findElement(By.css(tile_item)).click();
        await assertNotPresentElement(overlay_button);
    });

    /**
    * DOCU: (Tile Overlay "Till") 4. Check if till overlay is showing properly. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('4. Allow user to view "Till" tile overlay when empty tile is clicked.', async function() {
        /* Click the first tile (empty). */
        await driver.findElement(By.css(".tile_item:nth-child(1)")).click();
        
        /* Assert if overlay button have "Till" innerText */
        await assertText(".overlay_button", "Till");
    });

    /**
    * DOCU: (Tile Overlay "Plant") 5. Check if tilling tile function works. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('5. Allow user to set a tile item to ".tilled".', async function() {
        let tilled_tile = ".tile_item.tilled";
        let overylay_body = ".popover-body";

        /* Click tile overlay button to set a tile to tilled */
        await driver.findElement(By.css(overylay_body)).click();
        await assertElement(tilled_tile);

        /* Click tile item with .tilled class then assert if it's already hidden.*/
        await driver.findElement(By.css(tilled_tile)).click();
        await assertNotPresentElement(overylay_body);
    });

    /**
    * DOCU: (Tile Overlay "Plant") 6. Check if user can view tile overlay "Plant" when tilled tile item is clicked. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('6. Allow user to view tile overlay "Plant".', async function(){
        /* Click tile item that's tilled by the user. */
        await driver.findElement(By.css(".tile_item.tilled")).click();

        /* Check if overylay button contains "Plant" in text. */
        await assertText(".overlay_button", "Plant");
    });

    /**
    * DOCU: (Plant Crop Modal) 7. Check if show, close and cancel of plant crop modal works. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('7. Allow user to view, close and cancel plant crop modal.', async function(){
        let overlay_button = ".overlay_button";
        let modal_body = ".modal-body";

        /* Click overlay button "Plant" then check if modal is visible. */
        await driver.findElement(By.css(overlay_button)).click();
        await assertText(overlay_button, "Plant");
 
        await driver.findElement(By.css(overlay_button)).click();
        await assertElement(modal_body);

        /* Click close (x) button of modal */
        await driver.findElement(By.css(".modal-body .close_button")).click();
        await assertNotPresentElement(modal_body);

        /* Click till container .tilled class */
        await driver.findElement(By.css(".tile_item.tilled")).click();
        await assertText(overlay_button, "Plant");

        /* Click till container overlay button "Plant" */
        await driver.findElement(By.css(overlay_button)).click();
        await assertElement(modal_body);

        /* Click cancel button of modal" */
        await driver.findElement(By.css(".action_container button[type=button]")).click();
        await assertNotPresentElement(modal_body);
    });

    /**
    * DOCU: (Plant Crop) 8. Check if planting a crop works. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('8. Allow user to plant a crop.', async function(){   
        let earning_value_text = "earning_value";
        let overlay_button = ".overlay_button";
        let potato_icon = ".potato_icon";
        let modal_submit_button = ".action_container button[type=submit]";
        let earning_value = await driver.findElement(By.id(earning_value_text)).getText(); 

        /* Click tile item with .tilled class. */
        await driver.findElement(By.css(".tile_item.tilled")).click();
        await assertElement(overlay_button);

        /* Click tile overlay button "Plant". */
        await driver.findElement(By.css(overlay_button)).click();
        await assertElement(potato_icon);

        /* Choose potato in modal form option. */
        await driver.findElement(By.css(potato_icon)).click();
        await assertElement(modal_submit_button);

        /* Submit modal by clicking "Plant" button. */
        await driver.findElement(By.css(modal_submit_button)).click();

        /* Check if modal visibility is none. */
        await assertNotPresentElement("show_plant_modal");
        
        /* Check if crop is planted. */
        await assertElement(".tile_item.planted");

        let new_earning_value = await driver.findElement(By.id(earning_value_text)).getText();

        /* Assert if earning value decrease as an expense to planting a crop. */
        assert(parseInt(earning_value) > parseInt(new_earning_value));
    });

    /**
    * DOCU: (Harvest Overlay) 8. Check if harvest crop feature works. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('9. Allow user to harvest a crop.', async function(){    
        let harvest_tile = ".tile_item.harvest";
        let tile_item = ".tile_item";
        let earning_value_text = "earning_value";
        let overlay_button = ".popover-body .overlay_button";
        let earning_value = await driver.findElement(By.id(earning_value_text)).getText();

        /* Wait for crops to be ready to harvest. */
        await assertElement(harvest_tile);

        /* Click tile item with .harvest class. */
        await driver.findElement(By.css(harvest_tile)).click();
        await assertElement(overlay_button);

        /* Click tile overlay "Harvest". */
        await driver.findElement(By.css(overlay_button)).click();
        await assertElement(tile_item);

        /* Click tile item to hide overlay. */
        await driver.findElement(By.css(tile_item)).click();
        await assertNotPresentElement(overlay_button);
        
        let new_earning_value = await driver.findElement(By.id(earning_value_text)).getText();

        /* Assert if earning value increase  after harvesting */
        assert(parseInt(earning_value) < parseInt(new_earning_value));
    });

    /**
    * DOCU: (Remove Crop) 10. Check if tile overlay "Remove" can be view. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('10. Allow user to view remove crop modal.', async function(){
        let modal_submit_button = ".action_container button[type=submit]";    
        let empty_tile = ".tile_item.empty";
        let planted_tile = ".tile_item.planted";
        let overlay_button = ".popover-body .overlay_button";
        let onion_option = ".modal-body .onion_icon";
        let modal_remove_button = ".modal-body .remove_button";

        /* Click Empty Tile */
        await driver.findElement(By.css(empty_tile)).click();
        await assertElement(overlay_button);
    
        /* Plant onion to empty tile. */
        await plantCrop(overlay_button, onion_option, modal_submit_button);

        /* Click Planted Tile */
        await driver.findElement(By.css(planted_tile)).click();
        await assertElement(overlay_button);

        /* Click remove overlay */
        await driver.findElement(By.css(overlay_button)).click();
        await assertElement(modal_remove_button);
    });

    /**
    * DOCU: (Remove Crop) 11. Check if remove crop button in modal works. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('11. Allow user to remove Crop', async function(){
        /* Click remove button in modal */
        await driver.findElement(By.css(".modal-body .remove_button")).click();
        await assertNotPresentElement(".modal-body .remove_button");
    });

    /** 
    * DOCU: (Expand Land button) 12. Check if expand land button is working. <br>
    * Expected test result: green
    * Last updated at: January 17, 2023
    * @author Noel
    */
    it('12. Allow user to get enough money then expand land to 5 x 5.', async function(){
        let overlay_button = ".popover-body .overlay_button";
        let corn_option = ".modal-body .corn_icon";
        let modal_submit_button = ".modal-body .action_container button[type=submit]";
        let harvest_tile = ".tile_item.harvest";
        let harvest_button = ".popover-body button:nth-child(1)";

        /* Plant first crop */
        /* Click Empty tile (16th)*/
        await driver.findElement(By.css(".tile_item:nth-child(16)")).click();
        await assertElement(overlay_button);
        await plantCrop(overlay_button, corn_option, modal_submit_button);
        
        /* Wait until crop can be harvested */
        await assertElement(harvest_tile, ASSERT_DURATION.slowest);

        /* Click tile with harvest class */
        await driver.findElement(By.css(harvest_tile)).click();
        await assertElement(harvest_button);

        /* click pop over harvest button */
        await driver.findElement(By.css(harvest_button)).click();
        await assertElement(overlay_button);

        /* Plant second crop */
        await plantCrop(overlay_button, corn_option, modal_submit_button);

        /* Plant third crop */
        await driver.findElement(By.css(".tile_item:nth-child(15)")).click();
        await assertElement(overlay_button);
        await plantCrop(overlay_button, corn_option, modal_submit_button);

        /* Wait until tile is ready to harvest then click it. */
        await assertElement(harvest_tile, ASSERT_DURATION.slowest);
        await harvestCrop(16, harvest_button, overlay_button);

        /* Wait until tile is ready to harvest then click it. */
        await assertElement(harvest_tile, ASSERT_DURATION.slowest);
        await harvestCrop(15, harvest_button, overlay_button);
           
        /* Expand the land to 5x5 and assert if the 25th tile exist. */
        await driver.findElement(By.id("expand_land_button")).click();
        await assertElement(".tile_item:nth-child(25)");
    });

    /* ------------------------------------------------------------------- */
    /* -------------------------- End of Test Cases ---------------------- */
    /* ------------------------------------------------------------------- */
});
