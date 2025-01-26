import React from 'react';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import MegaMenu from '../../common/MegaMenu/MegaMenu';
import PublisherPage from './PublisherPage';
import usePublishers from '../../../Hooks/usePublishers';
import Pagination from '../../Shared/Pagination/Pagination';

export default function PublishersPage({ CartItem }) {
  const [publishers, pageCount, handlePageClick, offset, displayData] = usePublishers();

  return (
    <>
      <Header CartItem={CartItem} />
      <MegaMenu />
      <div className="container mx-auto mt-3 mb-5">
        <h4 className="text-2xl font-bold text-center mb-2">আমাদের প্রকাশক</h4>
        <hr className="bg-green-500 h-1 w-1/4 mx-auto" />
        {publishers?.length === 0 && <div className="min-h-screen"></div>}
        {publishers?.length !== 0 && (
          <>
            {displayData?.length <= 5 ? (
              <div className="min-h-[700px] max-h-[2000px] w-11/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto">
                  {displayData.map((publisher) => (
                    <PublisherPage key={publisher?.id} publisher={publisher} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-11/12  grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 container mx-auto">
                {displayData.map((publisher) => (
                  <PublisherPage key={publisher?.id} publisher={publisher} />
                ))}
              </div>
            )}
            <div className="container w-3/4 mx-auto mt-5">
              <Pagination
                pageCount={pageCount}
                handlePageClick={handlePageClick}
                offset={offset}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
