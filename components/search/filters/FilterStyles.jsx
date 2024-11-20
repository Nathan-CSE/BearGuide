import EStyleSheet from 'react-native-extended-stylesheet'

const FilterStyles = EStyleSheet.create({
  filterTitle: {
    fontSize: 20, 
    fontWeight: '600',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
    flexShrink: 1
  },
  filterPressable: { 
    flexDirection: 'row', 
    gap: 8, 
    alignItems: 'center',
    paddingVertical: 16,
  },
  filterList: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    gap: 12,
  },
  'filterList:nth-child-even': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  filterPressableClose: { 
    flexShrink: 1, 
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 32,
    android_ripple: { color: 'rgba(0,0,0,0.2)' },
  },
  filterHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }
});

export default FilterStyles;