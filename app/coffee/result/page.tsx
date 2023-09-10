'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSearchParams } from 'next/navigation';
import coffeeImage from '@/public/coffee/result.svg';
import walletImage from '@/public/coffee/wallet.svg';
import UniqueText from '@/components/UniqueText';
import IconButton from '@/components/button/IconButton';
import linkIcon from '@/public/button/button_link.svg';
import refreshIcon from '@/public/button/button_refresh.svg';

export default function CoffeeResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boom = searchParams.get('boom');

  const copyURL = () => {
    const currentURL = window.location.href;

    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        console.log('URL이 클립보드에 복사되었습니다.');
      })
      .catch(error => {
        console.error('URL 복사 중 오류 발생:', error);
      });
  };

  return (
    <div className="mt-[2.33rem]">
      <UniqueText Tag="p" size="lg" font="uhbee" className="text-center mb-2">
        오늘의 커피는
      </UniqueText>
      <UniqueText Tag="h1" size="lg" font="sans" className="text-center">
        <strong className="text-milkChocolate">{boom}번</strong>이 쏠게요!
      </UniqueText>

      <div className="mt-6 mb-[3.16rem] w-[18.5rem] h-[24.125rem] relative">
        <Image className="absolute w-full h-full" src={coffeeImage} alt="실망한 커피" width={296} height={386} />
        <Image className="absolute bottom-0 animate-bounce" width={97} height={136} src={walletImage} alt="지갑 커피" />
      </div>
      <div className="flex m-auto justify-evenly">
        <IconButton onClick={() => router.push('/coffee')}>
          <Image src={refreshIcon} className="w-4 h-4" width={48} height={48} alt="처음으로 돌아가기 버튼" />
        </IconButton>
        <IconButton onClick={() => copyURL()}>
          <Image src={linkIcon} className="w-4 h-4" width={48} height={48} alt="링크 복사 버튼" />
        </IconButton>
      </div>
    </div>
  );
}