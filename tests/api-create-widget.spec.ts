import { test, expect } from '@playwright/test';
import { testing_data } from './test-data';

test('create-widget-via-api', async ({ request }) => {
  // 1. Create a user
const response1 = await request.post(testing_data.application_url + testing_data.api_path_create_user,
  {
    data: { "username": "user5", "password": "testtest" },
  }
);
  //// Verify that the user is created by checking if the response is within `200..299` range
  await expect(response1).toBeOK();


  // 2. Authenticate the user
  const response2 = await request.post(testing_data.application_url + testing_data.api_path_authenticate,
    {
      data: { "username": "user5", "password": "testtest" },
    }
  );

  //// Verify that the user is authenticated by checking if the response is within `200..299` range
  await expect(response2).toBeOK();

  //// Capture the authentication token to use it in the next step
  const response2_json = await response2.json();
  const authorization_token = response2_json.authorization; 


  // 3. Create the new widget

  const widget_name = "Widget " + String(Date.now())

  const response3 = await request.post(testing_data.application_url + testing_data.api_path_create_widget,
    {
      headers: {'Authorization': authorization_token},
      data: { "name": widget_name, "sides": "5" },
    }
  );

  //// Verify that the widget is created by checking if the response is within `200..299` range
  await expect(response3).toBeOK();

  //// Verify that the response includes a unique text that is only sent when a widget is created
  await expect(await response3.text()).toContain("total_items")  



});
