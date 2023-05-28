import GovIcon from 'src/assets/images/GovIcon.svg';

export default function Footer() {
  return (
    <footer className='container bg-gray-100'>
      <div className='grid grid-cols-2 gap-3 border-b border-b-gray-300 py-4 md:grid-cols-5 md:py-7'>
        <div>
          <h4 className='mb-4 text-xs font-bold text-gray-700'>CHĂM SÓC KHÁCH HÀNG</h4>
          <ul className='text-xs text-gray-600'>
            <li className='mb-2'>
              <a href='https://help.shopee.vn/portal' className='hover:text-orange'>
                Trung Tâm Trợ Giúp
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://shopee.vn/blog/' className=' hover:text-orange'>
                Shopee Blog
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/article/79090-[Th%C3%A0nh-vi%C3%AAn-m%E1%BB%9Bi]-Shopee-Mall-l%C3%A0-g%C3%AC?previousPage=search%20recommendation%20bar'
                className='hover:text-orange'
              >
                Shopee Mall
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/article/79180-[Th%c3%a0nh-vi%c3%aan-m%e1%bb%9bi]-L%c3%a0m-sao-%c4%91%e1%bb%83-mua-h%c3%a0ng-%2F-%c4%91%e1%ba%b7t-h%c3%a0ng-tr%c3%aan-%e1%bb%a9ng-d%e1%bb%a5ng-Shopee%3F'
                className='hover:text-orange'
              >
                Hướng Dẫn Mua Hàng
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://banhang.shopee.vn/edu/article/13243/ban-hang-online-bat-dau-tu-dau'
                className='hover:text-orange'
              >
                Hướng Dẫn Bán Hàng
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/category/59-Thanh-To%C3%A1n/708-V%C3%AD-ShopeePay?page=1'
                className='hover:text-orange'
              >
                Thanh Toán
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/article/79144-[Shopee-Xu]-C%c3%a1c-c%c3%a2u-h%e1%bb%8fi-th%c6%b0%e1%bb%9dng-g%e1%ba%b7p'
                className='hover:text-orange'
              >
                Shopee Xu
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/category/60-%C4%90%C6%A1n-H%C3%A0ng-V%E1%BA%ADn-Chuy%E1%BB%83n/703-%C4%90%C6%A1n-h%C3%A0ng?page=1'
                className='hover:text-orange'
              >
                Vận Chuyển
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/article/79258-Tr%e1%ba%a3-h%c3%a0ng%2FHo%c3%a0n-ti%e1%bb%81n]-C%e1%ba%a9m-nang-Tr%e1%ba%a3-h%c3%a0ng-ho%c3%a0n-ti%e1%bb%81n'
                className='hover:text-orange'
              >
                Trả Hàng & Hoàn Tiền
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/article/79191-%5BD%E1%BB%8Bch-v%E1%BB%A5%5D-L%C3%A0m-sao-%C4%91%E1%BB%83-li%C3%AAn-h%E1%BB%87-Ch%C4%83m-s%C3%B3c-Kh%C3%A1ch-h%C3%A0ng'
                className='hover:text-orange'
              >
                Chăm Sóc Khách Hàng
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='https://help.shopee.vn/portal/article/79046-[Quy-%c4%91%e1%bb%8bnh]-Ch%c3%adnh-s%c3%a1ch-b%e1%ba%a3o-h%c3%a0nh-cho-s%e1%ba%a3n-ph%e1%ba%a9m-mua-t%e1%ba%a1i-Shopee'
                className='hover:text-orange'
              >
                Chính Sách Bảo Hành
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='mb-4 text-xs font-bold text-gray-700'>VỀ SHOPEE</h4>
          <ul className='text-xs text-gray-600'>
            <li className='mb-2'>
              <a href='https://careers.shopee.vn/about' className='hover:text-orange'>
                Giới Thiệu Về Shopee Việt Nam
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://careers.shopee.vn/jobs' className='hover:text-orange'>
                Tuyển Dụng
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://help.shopee.vn/portal/article/77242' className='hover:text-orange'>
                Ðiều Khoản Shopee
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://help.shopee.vn/portal/article/77244' className='hover:text-orange'>
                Chính Sách Bảo Mật
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://shopee.vn/mall/' className='hover:text-orange'>
                Chính Hãng
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://banhang.shopee.vn/' className='hover:text-orange'>
                Kênh Nguời Bán
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://shopee.vn/flash_sale/' className='hover:text-orange'>
                Flash Sales
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://shopee.vn/affiliate/' className='hover:text-orange'>
                Chương Trình Tiếp Thị Liên Kết Shopee
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://shopee.vn/buyer/login?next=https%3A%2F%2Fshopee.vn%2F' className='hover:text-orange'>
                Liên Hệ Với Truyền Thông
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className='mb-4'>
            <h4 className='mb-4 text-xs font-bold text-gray-700'>THANH TOÁN</h4>
            <ul className='grid grid-cols-3 gap-2'>
              <li>
                <img
                  src='https://cf.shopee.vn/file/d4bbea4570b93bfd5fc652ca82a262a8'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/a0a9062ebe19b45c1ae0506f16af5c16'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/38fd98e55806c3b2e4535c4e4a6c4c08'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/bc2a874caeee705449c164be385b796c'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/2c46b83d84111ddc32cfd3b5995d9281'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/5e3f0bee86058637ff23cfdf2e14ca09'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/9263fa8c83628f5deff55e2a90758b06'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/0217f1d345587aa0a300e69e2195c492'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 text-xs font-bold text-gray-700'>ÐỐI TÁC VẬN CHUYỂN</h4>
            <ul className='grid grid-cols-3 gap-2'>
              <li>
                <img
                  src='https://cf.shopee.vn/file/5e7282bd0f7ee0872fdb0bd1d40fbe9e'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/d10b0ec09f0322f9201a4f3daf378ed2'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/77bf96a871418fbc21cc63dd39fb5f15'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/59270fb2f3fbb7cbc92fca3877edde3f'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/957f4eec32b963115f952835c779cd2c'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/0d349e22ca8d4337d11c9b134cf9fe63'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/3900aefbf52b1c180ba66e5ec91190e5'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/6e3be504f08f88a15a28a9a447d94d3d'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/b8348201b4611fc3315b82765d35fc63'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
              <li>
                <img
                  src='https://cf.shopee.vn/file/0b3014da32de48c03340a4e4154328f6'
                  className='h-7 w-14 rounded-sm bg-white object-contain p-[5px] shadow-sm'
                  alt=''
                />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className='mb-4 text-xs font-bold text-gray-700'>THEO DÕI CHÚNG TÔI TRÊN</h4>
          <ul className='text-xs text-gray-600'>
            <li className='mb-2'>
              <a href='https://www.facebook.com/ShopeeVN' className='hover:text-orange'>
                Facebook
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://www.instagram.com/Shopee_VN/' className='hover:text-orange'>
                Instagram
              </a>
            </li>
            <li className='mb-2'>
              <a href='https://www.linkedin.com/company/shopee' className='hover:text-orange'>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className='mb-4 text-xs font-bold text-gray-700'>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h4>
          <div className='grid grid-cols-2 gap-2'>
            <div>
              <a href='https://shopee.vn/web' className='hover:text-orange'>
                <img
                  src='https://cf.shopee.vn/file/a5e589e8e118e937dc660f224b9a1472'
                  alt='qrcode'
                  className='rounded-sm bg-white object-contain p-1 shadow-md'
                />
              </a>
            </div>
            <div>
              <ul className='text-xs text-gray-600'>
                <li className='mb-2'>
                  <a href='https://shopee.vn/web' className='hover:text-orange'>
                    <img
                      src='https://cf.shopee.vn/file/ad01628e90ddf248076685f73497c163'
                      alt='apple-store'
                      className='mb-1 rounded-sm bg-white object-contain p-1 shadow-md'
                    />
                  </a>
                </li>
                <li className='mb-2'>
                  <a href='https://shopee.vn/web' className='hover:text-orange'>
                    <img
                      src='https://cf.shopee.vn/file/ae7dced05f7243d0f3171f786e123def'
                      alt='ch-play'
                      className='mb-1 rounded-sm bg-white object-contain p-1 shadow-md'
                    />
                  </a>
                </li>
                <li className='mb-2'>
                  <a href='https://shopee.vn/web' className='hover:text-orange'>
                    <img
                      src='https://cf.shopee.vn/file/35352374f39bdd03b25e7b83542b2cb0'
                      alt='app-gallery'
                      className='mb-1 rounded-sm bg-white object-contain p-1 shadow-md'
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='py-4 text-xs text-gray-600 md:py-8'>
        <div className=' mb-5 grid grid-cols-1 md:mb-12 md:grid-cols-3'>
          <h4 className='mb-2 text-center md:col-span-1 md:mb-0 md:text-left'>
            © 2023 Shopee. Tất cả các quyền được bảo lưu.
          </h4>
          <h4 className='text-center md:col-span-2 md:text-left'>
            Quốc gia & Khu vực: Singapore | Indonesia | Ðài Loan | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil
            | México | Colombia | Chile
          </h4>
        </div>

        <div className='mb-4 text-center md:mb-[3rem]'>
          <a className='mx-4' href='https://help.shopee.vn/portal/article/77244'>
            CHÍNH SÁCH BẢO MẬT
          </a>
          |
          <a className='mx-4' href='https://help.shopee.vn/portal/article/77245'>
            QUY CHẾ HOẠT ÐỘNG
          </a>
          |
          <a className='mx-4' href='https://help.shopee.vn/portal/article/77250'>
            CHÍNH SÁCH VẬN CHUYỂN
          </a>
          |
          <a className='mx-4' href='https://help.shopee.vn/portal/article/77251'>
            CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN
          </a>
        </div>

        <div className='mx-auto mb-4 grid max-w-md grid-cols-2 text-center md:mb-[2rem]'>
          <a href='http://online.gov.vn/Home/WebDetails/18367' className='mx-4'>
            <img src={GovIcon} alt='logo' />
          </a>

          <a href='http://online.gov.vn/Home/WebDetails/18367' className='mx-4'>
            <img src={GovIcon} alt='logo' />
          </a>
        </div>

        <div className='text-center'>
          <h4 className='mb-4'>Công ty TNHH Shopee</h4>
          <p className='leading-6'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn <br />
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678) <br />
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015 <br />© 2015 -
            Bản quyền thuộc về Công ty TNHH Shopee
          </p>
        </div>
      </div>
    </footer>
  );
}
