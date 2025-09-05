import { test, expect } from '@playwright/test';
import { testing_data } from './test-data';
import { ui_element } from './ui-elements';

test('user can create a widget', async ({ page , request}) => {
  await page.goto(testing_data.application_url);

  // Verify that the login page is shown
  await expect(ui_element.SIGN_IN_PAGE_TITLE(page)).toBeVisible();


  // Create a new user using the API request
  const user_name = "user10"
  const pass_word = "testtest"
  const response1 = await request.post(testing_data.application_url + testing_data.api_path_create_user,
    {
      data: { "username": user_name, "password": pass_word },
    }
  );
    //// Verify that the user is created by checking if the response is within `200..299` range
    await expect(response1).toBeOK();

  // Login with the user
  await ui_element.USERNAME_FIELD(page).fill(user_name)
  await ui_element.PASSWORD_FIELD(page).fill(pass_word)
  await ui_element.LOGIN_BUTTON(page).click()


  // Verify that the Widget factory homepage is shown
  await expect(ui_element.KNOWN_WIDGETS_SECTION_TITLE(page)).toBeVisible();
  await expect(ui_element.ADD_EDIT_WIDGET_SECTION_TITLE(page)).toBeVisible();


  // Create a new Widget
  const new_widget_name = "Widget "+ String(Date.now())
  const new_sides = "10"

  await ui_element.WIDGET_NAME_FIELD(page).fill(new_widget_name)
  await ui_element.SIDES_FIELD(page).fill(new_sides)
  await ui_element.SAVE_BUTTON(page).click()
  await expect(ui_element.SUCCESS_MESSAGE(page)).toBeVisible();


  // Verify that the new widget is shown when loading the widgets
  await ui_element.LOAD_WIDGETS_BUTTON(page).click()
  await expect(page.getByText(new_widget_name)).toBeVisible();


});

