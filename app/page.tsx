import Board from '@/components/Board';
import Header from '@/components/Header';

export default function Home() {
    return (
        <main>
            <Header />

            <section className='px-2'>
                <Board />
            </section>
        </main>
    );
}
