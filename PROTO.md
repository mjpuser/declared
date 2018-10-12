# Declared

Prototype of what **Declared** could look like

## Model

```js
// user.js
{
    "name": joi().string(),
    "age": joi().number(),
}
```

## Rendering

```html
<grid list={session.user.addresses} as="address">
    <Address address={(address) => address}>
</grid>
```

## Form
```html
<form id="some-id">
    <input
        type="text"
        /* set initial value of input */
        fromData={({ model }) => model.field}
        /* how to store input on submit */
        toData={(value) => ({ '[model].[field]': value })}
    />
    <button type="submit">
        Submit
        <confirm>
            Are you sure?
        </confirm>
    </button>
</form>
```
