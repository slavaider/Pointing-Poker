import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Counter from '../Counter';

const HomePage: React.FC = () => {
  return (
    <>
      <Counter />
      <Image
        src="/test.jpg"
        alt="Picture of the banana"
        width={100}
        height={100}
      />
      <ul>
        <li>
          <Link href="/" replace>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about" replace>
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/settings" replace>
            <a>Settings</a>
          </Link>
        </li>
        <li>
          <Link href="/test" replace>
            <a>Test</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default HomePage;
