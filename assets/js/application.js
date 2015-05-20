/* Main application.js file */

var app = {
  /*
   Static list of items
   */
  cart: null,
  items: [
    {id: 1, name: 'Rufus', description: 'Small descriptive text placeholder', price: 560.00},
    {id: 2, name: 'Ruby', description: 'Small descriptive text placeholder', price: 560.00},
    {id: 3, name: 'Spot', description: 'Small descriptive text placeholder', price: 560.00},
    {id: 4, name: 'Bruce', description: 'Small descriptive text placeholder', price: 560.00},
    {id: 5, name: 'Ben', description: 'Small descriptive text placeholder', price: 560.00},
    {id: 6, name: 'Honey', description: 'Small descriptive text placeholder', price: 560.00}
  ],
  init: function () {
    var $this = this;
    this.initPreviewNavigation();
    // initialize a new cart
    if ($('div#cartInfo').length) {
      this.cart = new Cart();
      this.updateCartCount(this.cart.items.length);
      // initialize add to cart click handlers
      $('div.btns a').unbind('click').on('click', function (e) {
        e.preventDefault();
        var id = parseInt($(this).attr('data-id'));
        // check if item is already in cart
        if (!(app.isInCart($this.cart, id))) {
          // find the item from the static list and add it to the cart.
          $this.cart.addItem(app.findItem(id));
          app.updateCartCount($this.cart.items.length);
        }
      });

      // initialize view cart handler
      $('a#cart').unbind('click').on('click', function (e) {
        e.preventDefault();
        if ($('#shoppingCart').hasClass('hide')) {
          $this.displayCart();
        }
        $this.swapAction('For your own commission framed and delivered, please contact me on 0780 445873');
      });

      $('a.home').unbind('click').on('click', function (e) {
        e.preventDefault();
        $('#page-store').addClass('hide');
        $('#page-home').removeClass('hide');
        $('#action a').html('Check out our store to view a full range of readily available portraits');
      });

      // initialize main action
      if (!$('#page-home').hasClass('hide')) {
        $('div#action a').unbind('click').on('click', function (e) {
          e.preventDefault();
          $('#page-home').addClass('hide');
          $('#page-store').removeClass('hide');
          $this.swapAction('For your own commission framed and delivered, please contact me on 0780 445873');
        });

      } else {
        $('#action a').unbind('click');
      }
      app.initializeCartHandlers();
    }
  },
  swapAction: function (value) {
    $('#action a').html(value).unbind('click');
  },
  initializeCartHandlers: function () {
    $('div.cart-btns a').unbind('click').on('click', function (e) {
      e.preventDefault();
      if ($(this).attr('id') === 'carryOn') {
        // display store page hide cart
        $('#shoppingCart').addClass('hide');
        $('#page-store').removeClass('hide');
        $('#items').toggle();
      } else {
        // display home page hide cart
        $('#page-store').addClass('hide');
        $('#shoppingCart').addClass('hide');
        $('#page-home').addClass('hide');
        $('#preview').append('<h1 id="gateway">Here is where you would fill in your card details</h1>');
      }
    });
  },
  initPreviewNavigation: function () {
    $('div.outer a').unbind('click').on('click', function (e) {
      e.preventDefault();
      $('#page-home').addClass('hide');
      $('#page-store').removeClass('hide');
      app.swapAction('For your own commission framed and delivered, please contact me on 0780 445873');
    });
  },
  displayCart: function () {
    var $this = this, html = [], i, cartTotal = this.cart.getTotal();
    $('#items').toggle();
    $('#shoppingCart tbody').empty();
    for (i = 0; i < this.cart.items.length; i += 1) {
      html.push('<tr>');
      html.push('<td>' + this.cart.items[i].id + '</td>');
      html.push('<td>' + this.cart.items[i].name + '</td>');
      html.push('<td>' + this.cart.items[i].description + '</td>');
      html.push('<td>£' + this.cart.items[i].price + '.00</td>');
      html.push('<td class="remove"><a href="#" data-id="' + this.cart.items[i].id + '" title="Remove Item">Remove</a></td>');
      html.push('</tr>');
    }
    html.push('<tr><td id="grandTotal" colspan="5">Total: £' + cartTotal + '.00</td></tr> ');

    $('#shoppingCart tbody').append(html.join('').split(',').toString());
    $('#shoppingCart').removeClass('hide');

    // initialize remove handler
    $('#shoppingCart tbody a').unbind('click').on('click', function (e) {
      e.preventDefault();
      var id = parseInt($(this).attr('data-id')), itemToRemove = app.findItem(id);
      if (itemToRemove != null) {
        $this.cart.removeItem(itemToRemove);
        $(this).parent().parent().remove();
        $this.updateCartCount($this.cart.items.length);
        $('#grandTotal').html('Total: £' + $this.cart.getTotal() + '.00');
      }
    });
  },
  findItem: function (id) {
    var foundItem;
    for (var i = 0; i < app.items.length; i += 1) {
      if (app.items[i].id === id) {
        foundItem = app.items[i];
        break;
      }
    }
    return foundItem;
  },
  isInCart: function (cart, id) {
    var isInCart = false;
    for (var i = 0; i < cart.items.length; i += 1) {
      if (cart.items[i].id === id) {
        isInCart = true;
        break;
      }
    }
    return isInCart;
  },
  updateCartCount: function (count) {
    $('#number span').html(count);
  }
};
function Cart() {
  this.items = [];
  this.total = 0.00
  return this;
}

Cart.prototype.addItem = function (item) {
  this.items.push(item);
  // update cart values
};

Cart.prototype.removeItem = function (item) {
  var removed = []
  for (var i = 0; i < this.items.length; i += 1) {
    if (!(this.items[i].id === item.id)) {
      removed.push(this.items[i]);
    }
  }
  this.items = removed;
};

Cart.prototype.getTotal = function () {
  var total = 0.0;
  for (var i = 0; i < this.items.length; i += 1) {
    total += this.items[i].price;
  }
  return total;
};

$(function () {
  app.init();
});
