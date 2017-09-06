import React, {Component, PropTypes} from 'react';
import {block} from '../../utils';
import Button from '../base/Button/Button';

const b = block('do-message-templates');

class DropDown extends Component {
  static propTypes = {
    maxItemCount: PropTypes.number,
    messageTemplates: PropTypes.array,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
    onSelect: PropTypes.func,
    onAdd: PropTypes.func,
  }

  static defaultProps = {maxItemCount: 10}

  isEnable() {
    return (this.props.messageTemplates.length < this.props.maxItemCount);
  }

  render() {
    const props = this.props;
    return (
      <div className={b('drop-down').mix(props.mix)}>
        <div className={b('drop-title')}>
          Создайте и используйте шаблон сообщения
          <span className={b('max-count')}>
            {props.messageTemplates.length}/{props.maxItemCount}
          </span>
        </div>
        {!!props.messageTemplates.length &&
          <div className={b('box')}>
            {props.messageTemplates.map(template =>
              <div key={template.id} className={b('element')}>
                <div onClick={() => { this.props.onSelect(template); }} className={b('name')}>
                  {template.name}
                </div>
                <div
                  title='Удалить'
                  onClick={() => { this.props.onRemove(template.id); }}
                  className={b('remove-control')}
                />
                <div
                  title='Реадктировать'
                  onClick={() => { this.props.onEdit(template.id); }}
                  className={b('edit-control')}
                />
              </div>)
            }
          </div>
        }
        <div
          onClick={() => { this.isEnable() && this.props.onAdd(null); }}
          className={b('new-box').mix(!this.isEnable() && 'is-disable')}
        >
          {this.isEnable() && <Button>Создать новый шаблон</Button>}
          {/* <div className={b('new-template')}>создать новый шаблон</div>}
           <div className={b('info-message')}>не более {props.maxItemCount} шаблонов</div> */}
        </div>
      </div>
    );
  }
}

export default DropDown;
