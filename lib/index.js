require('ember');
var compile = Em.Handlebars.compile;

module.exports = Em.Mixin.create({
  
  classNameBindings: ['active'],

  active: (function() {

    var self = this;

    var checked = this.get('checked');
    if (!checked) return;

    var value = this.getItemValue(this.get('value'));
    if (!value) return;

    return !!checked.find(function(item){
      return self.getItemValue(item) == value;
    });

  }).property('checked.length', 'value'),

  click: function(e) {
    var checked = this.get('checked');
    if (!checked) return;
    var val = this.get('value');
    if (checked.contains(val)){
      checked.removeObject(val);
    } else {
      checked.pushObject(val);
    }
  },

  getItemValue: function(item){
    var path = this.get('optionValuePath');
    if (!path) return item;
    return item.get(path);
  },

});
