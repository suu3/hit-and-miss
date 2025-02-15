import styles from './up-down-button.module.css';
import Image from 'next/image';
import boxImage from '@/public/button/button_box.svg';
import plusIcon from '@/public/button/button_plus.svg';
import minusIcon from '@/public/button/button_minus.svg';
import UniqueText from '../UniqueText';
import clsx from 'clsx';
import { getDoubleDigitFormat } from '@/lib/utils/format';

interface UpDownButtonProps {
  count: number;
  handleIncrease?: () => void;
  handleDecrease?: () => void;
}

const UpDownButton = ({ count, handleIncrease = () => {}, handleDecrease = () => {} }: UpDownButtonProps) => {
  const MAX_COUNT = 12;

  const onClickUpBtn = () => {
    if (count >= MAX_COUNT) return alert('최대 인원은 12명입니다.');

    handleIncrease();
  };

  const onClickDownBtn = () => {
    if (count <= 0) return; //alert('최소 인원은 0명입니다.');
    handleDecrease();
  };

  return (
    <div className={styles['wrapper']}>
      <Image src={boxImage} alt="" sizes="100%" loading="eager" />
      <div className={styles['inner']}>
        <Image
          onClick={onClickDownBtn}
          src={minusIcon}
          alt="마이너스 버튼"
          width={32}
          height={32}
          className={clsx(styles['btn'], styles['minus'])}
        />
        <UniqueText size="md" font="uhbee-seulvely" Tag="span" className={styles['cnt']}>
          {getDoubleDigitFormat(count)}
        </UniqueText>
        <Image
          onClick={onClickUpBtn}
          src={plusIcon}
          alt="더하기 버튼"
          width={32}
          height={32}
          className={clsx(styles['btn'], styles['plus'])}
        />
      </div>
    </div>
  );
};

export default UpDownButton;
