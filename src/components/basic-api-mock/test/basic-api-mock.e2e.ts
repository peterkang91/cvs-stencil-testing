import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";

describe('basic-api-mock', () => {

  let page: E2EPage;
  let element: E2EElement;
  beforeEach(async () => { //We want to use beforeEach to reduce redundancy if there are more than one testing cases 
    page = await newE2EPage({
      html: `<basic-api-mock></basic-api-mock>`
    });
    element = await page.find("basic-api-mock");
  });

  it('renders', async () => {
    const element = await page.find('basic-api-mock');
    expect(element).toHaveClass('hydrated'); // Basic rendering of the component will have "hydrated" class
  });

  it("renders lists and alert banner when button is clicked", async () => {
    const button = await page.find("button");
    //When the StencilJS component's shadow is set up as true, we have to drill down from it's component using "">>>""
    //When the stencilJS component's shadow is set up as false, we can just find element without ">>>"
    button.click(); //Any element can be clicked by using click()
    await page.waitForChanges();

    const mainContainer = await page.find(".main-container");
    const lists = await mainContainer.findAll("p");
    const alertContainer = await page.find(".alert-container");
    const alertBanner = alertContainer.find("p");
    expect(lists).not.toBeNull();
    expect(lists.length).toBe(5);
    expect(alertBanner).toBeTruthy();
    expect((await alertBanner).textContent).toBe("Fetch Successfully")
  })
});
