/**
 * Module depencies.
 */
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

  onclick: function(e) {
    var checked = this.get('checked');
    if (!checked) return;

    Em.run(this, function(){
      var val = this.get('value');
      if (checked.contains(val)){
        checked.removeObject(val);
      } else {
        checked.pushObject(val);
      }

      Em.run.next(this, function(){
        this.send('onselect');
      });
      
    });

  }.on('click'),

  getItemValue: function(item){
    if (!item) return;
    var path = this.get('optionValuePath');
    if (!path) return item;
    return Em.get(item, path);
  },

  actions: {

    onselect: function(){}
  
  },

});
