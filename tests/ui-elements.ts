export const ui_element = {
  SIGN_IN_PAGE_TITLE: (page) => page.getByText('Sign In', { exact: true }),
  USERNAME_FIELD: (page) => page.getByRole('textbox', { name: 'Username' }),
  PASSWORD_FIELD: (page) => page.getByRole('textbox', { name: 'Password' }),
  LOGIN_BUTTON: (page) => page.getByRole('button', { name: 'Login' }),
  KNOWN_WIDGETS_SECTION_TITLE: (page) => page.getByText('Known Widgets'),
  ADD_EDIT_WIDGET_SECTION_TITLE: (page) => page.getByText('Add Edit Widget'),
  WIDGET_NAME_FIELD: (page) => page.getByRole('textbox', { name: 'Name' }),
  SIDES_FIELD: (page) => page.getByRole('textbox', { name: 'Sides' }),
  SAVE_BUTTON: (page) => page.getByRole('button', { name: 'Save Widget' }),
  SUCCESS_MESSAGE: (page) => page.getByText('success'),
  LOAD_WIDGETS_BUTTON: (page) => page.getByRole('button', { name: 'Load Widgets' })
  
}