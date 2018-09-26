// ----- Ember modules -----
import Service from '@ember/service'
import EventedMixin from '@ember/object/evented'
import {next} from '@ember/runloop'



export default Service.extend(EventedMixin, {

  // ----- Static properties -----
  isDragging     : false,
  isDraggingUp   : null,
  isDraggingLeft : null,

  draggedItem : null,
  group       : null,

  sourceList  : null,
  targetList  : null,
  sourceIndex : null,
  targetIndex : null,

  lastDragEnteredList : null,



  // ----- Custom methods -----
  startDragging ({item, index, items, group}) {
    this.setProperties({
      isDragging     : true,
      isDraggingUp   : false,
      isDraggingLeft : false,

      draggedItem : item,
      group,

      sourceList  : items,
      targetList  : items,
      sourceIndex : index,
      targetIndex : index,
    })

    if (items.length > 1) {
      if (index === 0) {
        this.set("targetIndex", index + 1)
        this.set("isDraggingUp", true)
        this.set("isDraggingLeft", false)

      } else {
        this.set("targetIndex", index - 1)
      }
    }

    next(() => {
      this.trigger('start', {
        group,
        draggedItem : item,
        sourceList  : items,
        sourceIndex : index,
      })
    })
  },



  draggingOver ({group, index, items, isDraggingUp, isDraggingLeft}) {
    // Ignore hovers over irrelevant groups
    if (group !== this.get('group')) return

    // Ignore hovers over irrelevant lists
    if (items !== this.get('targetList')) return

    if (index !== this.get('targetIndex')) {
      next(() => {
        this.trigger('sort', {
          group,
          sourceList     : this.get('sourceList'),
          sourceIndex    : this.get('sourceIndex'),
          draggedItem    : this.get('draggedItem'),
          targetList     : this.get('targetList'),
          oldTargetIndex : this.get('targetIndex'),
          newTargetIndex : index,
        })
      })
    }


    // Remember current index and direction
    this.setProperties({
      targetIndex : index,
      isDraggingUp,
      isDraggingLeft
    })
  },



  dragEntering ({group, items}) {
    // Ignore entering irrelevant groups
    if (group !== this.get('group')) return

    // Reset index when entering a new list
    if (items !== this.get('targetList')) {

      next(() => {
        this.trigger('move', {
          group,
          sourceList    : this.get('sourceList'),
          sourceIndex   : this.get('sourceIndex'),
          draggedItem   : this.get('draggedItem'),
          oldTargetList : this.get('targetList'),
          newTargetList : items,
          targetIndex   : 0,
        })
      })

      this.set('targetIndex', 0)
    }

    // Remember entering a new list
    this.setProperties({
      targetList          : items,
      lastDragEnteredList : items,
    })
  },



  endDragging ({action}) {
    const sourceList   = this.get('sourceList')
    const sourceIndex  = this.get('sourceIndex')
    const targetList   = this.get('targetList')
    let   targetIndex  = this.get('targetIndex')
    const isDraggingUp = this.get('isDraggingUp')
    const group        = this.get('group')
    const draggedItem  = this.get('draggedItem')
    const isDraggingLeft = this.get('isDraggingLeft')

    if (sourceList !== targetList || sourceIndex !== targetIndex) {
      // Account for dragged item shifting indexes by one
      if (
        sourceList === targetList
        && targetIndex > sourceIndex
      ) targetIndex--

      // Account for dragging down
      if (
        // Dragging Right Or Down
        (!isDraggingUp || !isDraggingLeft)

        // Target index is not after the last item
        && targetIndex < targetList.get('length')

        // The only element in target list is not the one dragged
        && !(
          targetList.get('length') === 1
          && targetList.get('firstObject') === draggedItem
        )
      ) targetIndex++

      if (
        (
          sourceList !== targetList
          || sourceIndex !== targetIndex
        )
        && typeof action === 'function'
      ) {
        next(() => {
          action({
            group,
            draggedItem,
            sourceList,
            sourceIndex,
            targetList,
            targetIndex
          })
        })
      }
    }

    this._reset()

    next(() => {
      this.trigger('end', {
        group,
        draggedItem,
        sourceList,
        sourceIndex,
        targetList,
        targetIndex
      })
    })
  },



  _reset () {
    this.setProperties({
      isDragging     : false,
      isDraggingUp   : null,
      isDraggingLeft : null,

      draggedItem : null,
      group       : null,

      sourceList  : null,
      targetList  : null,
      sourceIndex : null,
      targetIndex : null,

      lastDragEnteredList : null,
    })
  },
})
