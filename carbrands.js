var okCancelEvents = function (selector, callbacks) {
    var ok = callbacks.ok || function () {};
    var cancel = callbacks.cancel || function () {};

    var events = {};
    events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
        function (evt) {
            if (evt.type === "keydown" && evt.which === 27) {
                // escape = cancel
                cancel.call(this, evt);
            } else if (evt.type === "keyup" && evt.which === 13) {
                // blur/return/enter = ok/submit if non-empty
                var value = String(evt.target.value || "");
                if (value) {
                    ok.call(this, value, evt);
                } else {
                    cancel.call(this, evt);
                }
            }
        };
    return events;
};

CarBrands = new Meteor.Collection('carbrands');

if (Meteor.isClient) {
    Template.main.carbrands = function() {
        return CarBrands.find();
    }

    Template.main.events(okCancelEvents(
        '#brand',
        {
            ok: function (text, evt) {
                alert(text);
            }
        }));
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
