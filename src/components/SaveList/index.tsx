import { FiHardDrive } from 'react-icons/fi';
import { Save } from '../../models/Save';

import './styles.css';

type SaveListProps = {
  saveList: Array<Save>
}

export function SaveList({ saveList }: SaveListProps) {
  return (
    <aside className='save-list'>
      <h2>Saves</h2>

      <div className='items'>
        {saveList.length > 0 ? saveList.map(save => <p>{save.uid}</p>) : (
          <div className='hd-container'>
            <FiHardDrive className='hard-drive-icon'/>
            <p>Create a save and see them here</p>
          </div>
        )}
      </div>
    </aside>
  );
}