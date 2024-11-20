import { Chip } from 'react-native-paper';
import { useContext, useEffect } from 'react';
import { OverlayContext } from './SearchContexts';

const FilterChip = ({ label, selected, setSelected, id, component }) => {
  const [overlayContext, setOverlayContext] = useContext(OverlayContext);
  
  useEffect(() => {
    if (overlayContext === null) {
      setSelected('');
    }
  }, [overlayContext]);

  return (
    <Chip 
      icon={(selected === id && "menu-right-outline") || "menu-down"} 
      selected={selected === id} 
      showSelectedOverlay={true}
      onPress={() => {
        setSelected((prev) => {
          if(prev === id) {
            setOverlayContext(null);
            return '';
          } else {
            setOverlayContext(component);
            return id;
          }
        });
      }}
    >
      {label}
    </Chip>
  )
};

export default FilterChip;