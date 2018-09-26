// ----- Ember modules -----
import Component from '@ember/component'
import {inject as service} from '@ember/service'
import {reads} from '@ember/object/computed'
import {get, observer} from '@ember/object'
import {next} from '@ember/runloop'

// ----- Ember addons -----
// import computed from 'ember-macro-helpers/computed'
import and from 'ember-awesome-macros/and'
import or from 'ember-awesome-macros/or'
import eq from 'ember-awesome-macros/eq'

// ----- Own modules -----
import layout from '../templates/components/drag-sort-list'



export default Component.extend({

  // ----- Arguments -----
  items           : undefined,
  group           : undefined,
  draggingEnabled : true,
  childClass      : '',
  childTagName    : 'div',
  handle          : null,
  horizontalSort  : null,

  dragEndAction                  : undefined,
  determineForeignPositionAction : undefined,



  // ----- Services -----
  dragSort : service(),



  // ----- Overridden properties -----
  layout,
  classNameBindings : [
    ':dragSortList',
    'draggingEnabled:-draggingEnabled',
    'isDragging:-isDragging',
    'isDraggingOver:-isDraggingOver',
    'isExpanded2:-isExpanded',
    'isEmpty:-isEmpty',
  ],



  // ----- Static properties -----



  // ----- Aliases -----
  sourceList          : reads('dragSort.sourceList'),
  targetList          : reads('dragSort.targetList'),
  sourceIndex         : reads('dragSort.sourceIndex'),
  draggedItem         : reads('dragSort.draggedItem'),
  lastDragEnteredList : reads('dragSort.lastDragEnteredList'),



  // ----- Computed properties -----
  isDragging : and(
    'dragSort.isDragging',
    eq('group', 'dragSort.group')
  ),

  isDraggingOver : and(
    'isDragging',
    eq('items', 'targetList'),
  ),

  isExpanded : and(
    'isDragging',
    or('isEmpty', 'isOnlyElementDragged')
  ),

  isExpanded2 : reads('isExpanded'),

  isEmpty : eq('items.length', 0),

  isOnlyElementDragged : and(
    eq('items.length', 1),
    eq('items', 'sourceList'),
    eq('sourceIndex', 0)
  ),



  // ----- Overridden methods -----
  dragEnter (event) {
    // Ignore irrelevant drags
    if (!this.get('dragSort.isDragging')) return

    // Ignore irrelevant groups
    const group       = this.get('group')
    const activeGroup = this.get('dragSort.group')
    if (group !== activeGroup) return

    event.stopPropagation()

    // Ignore duplicate events (explanation: https://github.com/lolmaus/jquery.dragbetter#what-this-is-all-about )
    const items               = this.get('items')
    const lastDragEnteredList = this.get('lastDragEnteredList')
    if (items === lastDragEnteredList) return

    this.dragEntering()

    if (this.get('determineForeignPositionAction')) {
      this.forceDraggingOver()
    }
  },


  // ----- Custom methods -----
  dragEntering () {
    const group    = this.get('group')
    const items    = this.get('items')
    const dragSort = this.get('dragSort')

    dragSort.dragEntering({group, items})
  },

  forceDraggingOver () {
    const determineForeignPositionAction = this.get('determineForeignPositionAction')

    const group       = this.get('group')
    const items       = this.get('items')
    const itemsLength = get(items, 'length')
    const draggedItem = this.get('draggedItem')
    const sourceList  = this.get('sourceList')

    let isDraggingUp = true

    let index =
      items === sourceList
        ? items.indexOf(draggedItem) + 1
        : determineForeignPositionAction({draggedItem, items})

    if (index >= itemsLength) {
      index        = itemsLength - 1
      isDraggingUp = false
    }

    this.get('dragSort').draggingOver({group, index, items, isDraggingUp})
  },



  // ----- Observers -----
  setIsExpanded2 : observer('isExpanded', function () {
    // The delay is necessary for HTML class to update with a delay.
    // Otherwise, dragging is finished immediately.
    next(() => {
      if (this.get('isDestroying') || this.get('isDestroyed')) return

      this.set('isExpanded2', this.get('isExpanded'))
    })
  }),
})
