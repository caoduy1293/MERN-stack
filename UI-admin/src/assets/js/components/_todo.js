require('../libs/lobilist');
//Add your code here...
$(function () {
    //Basic example
    if ($('#todo-lists-basic-demo').length){
        $('#todo-lists-basic-demo').lobiList({
            lists: [
                {
                    id: 'todo',
                    title: 'TODO',
                    defaultStyle: 'lobilist-info',
                    items: [
                        {
                            title: 'Floor cool cinders',
                            description: 'Thunder fulfilled travellers folly, wading, lake.',
                            dueDate: '2015-01-31'
                        },
                        {
                            title: 'Periods pride',
                            description: 'Accepted was mollis',
                            done: true
                        },
                        {
                            title: 'Flags better burns pigeon',
                            description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.'
                        },
                        {
                            title: 'Accepted was mollis',
                            description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.',
                            dueDate: '2015-02-02'
                        }
                    ]
                },
                {
                    title: 'In Progress',
                    defaultStyle: 'lobilist-warning',
                    items: [
                        {
                            title: 'Composed trays',
                            description: 'Hoary rattle exulting suspendisse elit paradises craft wistful. Bayonets allures prefer traits wrongs flushed. Tent wily matched bold polite slab coinage celerities gales beams.'
                        },
                        {
                            title: 'Chic leafy'
                        },
                        {
                            title: 'Guessed interdum armies chirp writhes most',
                            description: 'Came champlain live leopards twilight whenever warm read wish squirrel rock.',
                            dueDate: '2015-02-04',
                            done: true
                        },
                        {
                            title: 'Floor cool cinders',
                            description: 'Thunder fulfilled travellers folly, wading, lake.',
                            dueDate: '2015-01-31'
                        },
                    ]
                },
                {
                    title: 'DOING',
                    defaultStyle: 'lobilist-success',
                    items: [
                        {
                            title: 'Composed trays',
                            description: 'Hoary rattle exulting suspendisse elit paradises craft wistful. Bayonets allures prefer traits wrongs flushed. Tent wily matched bold polite slab coinage celerities gales beams.'
                        },
                        {
                            title: 'Chic leafy'
                        },
                        {
                            title: 'Floor cool cinders',
                            description: 'Thunder fulfilled travellers folly, wading, lake.',
                            dueDate: '2015-01-31'
                        },
                        {
                            title: 'Guessed interdum armies chirp writhes most',
                            description: 'Came champlain live leopards twilight whenever warm read wish squirrel rock.',
                            dueDate: '2015-02-04',
                            done: true
                        },
                        {
                            title: 'Floor cool cinders',
                            description: 'Thunder fulfilled travellers folly, wading, lake.',
                            dueDate: '2015-01-31'
                        },
                        {
                            title: 'Guessed interdum armies chirp writhes most',
                            description: 'Came champlain live leopards twilight whenever warm read wish squirrel rock.',
                            dueDate: '2015-02-04',
                            done: true
                        }
                    ]
                },
                {
                    id: 'todo',
                    title: 'Trash',
                    defaultStyle: 'lobilist-danger',
                    items: [
                        {
                            title: 'Floor cool cinders',
                            description: 'Thunder fulfilled travellers folly, wading, lake.',
                            dueDate: '2015-01-31'
                        },
                        {
                            title: 'Periods pride',
                            description: 'Accepted was mollis',
                            done: true
                        },
                        {
                            title: 'Flags better burns pigeon',
                            description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.'
                        },
                        {
                            title: 'Accepted was mollis',
                            description: 'Rowed cloven frolic thereby, vivamus pining gown intruding strangers prank treacherously darkling.',
                            dueDate: '2015-02-02'
                        }
                    ]
                },

            ]
        });
    }
});
