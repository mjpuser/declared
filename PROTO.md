# Declared

Prototype of what **Declared** could look like

## Model

```js
// user.js
export default (declared) => ({
    "name": {
        type: 'text',
        required: true,
        maxlength: 100,
        minlength: 10,
        encrypt: true, // should this be password?  what else would we encrypt?
        hidden: true,
    },
    "dob": {
        type: 'date',
    },
    "phone": {
        type: 'phone',
    },
    "password": {
        type: 'password', // automatically encrypts
        policies: {
            special: 1,
            uppercase: 1,
            lowercase: 1,
            number: 1,
            noprevious: 3,
        }
    },
    "probability": {
        type: 'realnumber',
        max: { value: 1, inclusive: true },
        min: { value: 0, inclusive: true },
    },
    "age": {
        type: 'integer',
        max: 1000,
        min: 0
    },
})
```

### searching

If you want to search, you have to configure the service to be connected to a
search instance.  The client will have to be able to be notified when indexed
if it can be considered ready for use.

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
