// Category Collection
// ===================

// Includes file dependencies
define([ "jquery","backbone","models/CategoryModel" ], function( $, Backbone, CategoryModel ) {

    // Extends Backbone.Router
    var Collection = Backbone.Collection.extend( {

        // The Collection constructor
        initialize: function( models, options ) {

            // Sets the type instance property (ie. animals)
            this.type = options.type;

        },

        // Sets the Collection model property to be a Category Model
        model: CategoryModel,

        // Sample JSON data that in a real app will most likely come from a REST web service
        jsonArray: [

            { "category": "animals", "type": "Malai Kofta                            -Rs.150"},

            { "category": "animals", "type": "Kadai Paneer                        -Rs.150" },

            { "category": "animals", "type": "Dal Makhani                            -Rs.150" },

            { "category": "colors", "type": "Meethi Murg                        -Rs.200" },

            { "category": "colors", "type": "Butter chicken                        -Rs.220" },

            { "category": "colors", "type": "Chilly Chicken                        -Rs.180" },

            { "category": "colors", "type": "Chicken Jalfreezi                        -Rs.240" },

            { "category": "colors", "type": "Ghost de Lajawab                        -Rs.250" },

            { "category": "colors", "type": "Dum Biriyani                        -Rs.200" },

            { "category": "colors", "type": "Hyderabadi Biriyani                        -Rs.200" }


        ],

        // Overriding the Backbone.sync method (the Backbone.fetch method calls the sync method when trying to fetch data)
        sync: function( method, model, options ) {

            // Local Variables
            // ===============

            // Instantiates an empty array
            var categories = [],

                // Stores the this context in the self variable
                self = this,

                // Creates a jQuery Deferred Object
                deferred = $.Deferred();

            // Uses a setTimeout to mimic a real world application that retrieves data asynchronously
            setTimeout( function() {

                // Filters the above sample JSON data to return an array of only the correct category type
                categories = _.filter( self.jsonArray, function( row ) {

                    return row.category === self.type;

                } );

                // Calls the options.success method and passes an array of objects (Internally saves these objects as models to the current collection)
                options.success( categories );

                // Triggers the custom `added` method (which the Category View listens for)
                self.trigger( "added" );

                // Resolves the deferred object (this triggers the changePage method inside of the Category Router)
                deferred.resolve();

            }, 1000);

            // Returns the deferred object
            return deferred;

        }

    } );

    // Returns the Model class
    return Collection;

} );