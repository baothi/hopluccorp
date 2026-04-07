// ========== ABOUT PAGE DATA ==========

// Thông điệp lãnh đạo
export const leaderMessage = {
  title: 'Thông điệp',
  subtitle: 'LÃNH ĐẠO',
  slogan: 'PHÁT TRIỂN BỀN VỮNG LÀ KIM CHỈ NAM CHO MỌI HOẠT ĐỘNG',
  signatureImage: 'https://hopluccorp.vn/wp-content/uploads/2025/09/thu-ngo.png',
  leaderImage: 'https://hopluccorp.vn/wp-content/uploads/2023/03/lanh-dao.jpg',
  leaderName: 'Ông Lê Anh Hùng',
  leaderPosition: 'Chủ tịch HĐQT',
  content: [
    'Kính gửi: Quý Chủ đầu tư, Quý Đối tác',
    'Được thành lập từ năm 2009, khởi nguồn từ lĩnh vực xây dựng thuần túy, Hợp Lực đã trải qua hơn 16 năm hình thành và phát triển không ngừng nghỉ. Với chiến lược đúng đắn, nền tảng nội lực vững chắc cùng tinh thần đổi mới sáng tạo, đến nay, Hợp Lực đã vươn mình trở thành tổng thầu EPC hàng đầu Việt Nam trong lĩnh vực xây dựng công nghiệp. Đồng thời, chúng tôi đã phát triển hệ sinh thái đa ngành với 6 công ty hoạt động trong các lĩnh vực: xây dựng, cơ điện, hoàn thiện nội thất, vật liệu xây dựng và công nghiệp phụ trợ.',
    'Với hơn 200 dự án được triển khai thành công, trong đó có nhiều công trình FDI quy mô lớn, Hợp Lực tự hào đóng góp vào tiến trình công nghiệp hóa, hiện đại hóa đất nước. Năm 2024, tổng sản lượng hợp nhất toàn hệ thống đã vượt mốc 600 triệu USD – một dấu ấn thể hiện rõ năng lực, uy tín và vị thế ngày càng lớn mạnh của Hợp Lực trên thị trường trong nước và quốc tế.',
    'Trong bối cảnh nền kinh tế toàn cầu đang chuyển mình mạnh mẽ với nhiều cơ hội và thách thức đan xen, Hợp Lực xác định phát triển bền vững là kim chỉ nam cho mọi hoạt động. Chúng tôi cam kết tích hợp công nghệ tiên tiến, ứng dụng giải pháp xanh và thân thiện với môi trường, đồng thời tiếp tục mở rộng đa ngành, đa lĩnh vực một cách có chiến lược nhằm tạo dựng những giá trị thực tiễn, lâu dài cho khách hàng, đối tác và cộng đồng.',
    'Chúng tôi luôn trân trọng và biết ơn sự tin tưởng, hợp tác của Quý Chủ đầu tư, Quý Đối tác trong suốt chặng đường phát triển vừa qua. Rất mong sẽ tiếp tục nhận được sự đồng hành quý báu từ Quý vị để cùng nhau kiến tạo nên những giá trị bền vững, đóng góp thiết thực vào hành trình xây dựng một Việt Nam thịnh vượng, hùng cường.',
    'Trân trọng cảm ơn!'
  ]
};

// Lịch sử hình thành
export interface HistoryItem {
  id: number;
  year: string;
  image: string;
  description: string;
}

export const historyTimeline: HistoryItem[] = [
  {
    id: 1,
    year: '2009',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/03/lich-su-2009.jpg',
    description: 'Nhận thấy sự phát triển mạnh mẽ của thị trường Xây dựng Công nghiệp tại Việt Nam, Công ty Cổ phần Xây dựng Hợp Lực được thành lập chính thức vào năm 2009, đánh dấu bước đi đầu tiên trên con đường chinh phục và khẳng định bản lĩnh vượt qua khó khăn.'
  },
  {
    id: 2,
    year: '2010',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/z4132095951483_fd3a577f4afc0bb707de958a1830f70b.jpg',
    description: 'Dấu ấn tiếp theo trên hành trình phát triển của đơn vị chính là việc trở thành nhà thầu phụ cho dự án Samsung Electronics Việt Nam – một thương hiệu toàn cầu với những yêu cầu khắt khe về chuyên môn, kỹ thuật và công nghệ hiện đại.'
  },
  {
    id: 3,
    year: '2014',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/z4132095970449_2b3962fe20e3772d063e4ae3466cedfe.jpg',
    description: 'Năm 2014, Hợp Lực chuyển đổi thành công sang vai trò mới "Nhà thầu Thiết kế và Thi công", đánh dấu bước tiến "vững chắc" trong hành trình phát triển của doanh nghiệp bằng cách tận dụng những thành công và tiềm năng tăng trưởng trong quá khứ, cùng với sự tin tưởng và hỗ trợ của các nhà đầu tư lớn.'
  },
  {
    id: 4,
    year: '2016',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/z2244037126280_b325298fdce7bb1758b00973ae35b687-1-scaled.jpg',
    description: 'Năm 2016, Hợp Lực ghi dấu bước tiến nổi bật trong hành trình khẳng định vị thế và uy tín khi được lựa chọn làm Nhà thầu thiết kế và thi công cho Dự án Nhà máy điện tử Luxshare-ICT (Việt Nam). Đây là một dự án quy mô lớn, đòi hỏi năng lực chuyên môn cao, kinh nghiệm dày dặn và kỹ năng kỹ thuật chuyên sâu.'
  },
  {
    id: 5,
    year: '2019',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/04/z6504219956332_768cff643b0d3820d11735b8bfd9bfb3-1.jpg',
    description: 'Cột mốc đầu tiên trong hành trình đột phá của 10 năm thành lập, Hợp Lực đánh dấu một cách ấn tượng bằng việc chính thức nâng vốn điều lệ lên 300 tỷ đồng, là nền tảng để Công ty Cổ phần Công nghệ Xi mạ Hợp Lực vươn tầm trở thành một trong những nhà máy xi mạ đạt chuẩn hàng đầu tại Việt Nam.'
  },
  {
    id: 6,
    year: '2020',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/04/BAT09971-scaled.jpg',
    description: 'Năm 2020, Hợp Lực tăng trưởng mạnh mẽ với bước đi chiến lược thành lập Công ty Cổ phần Cơ điện Hợp Lực, mở đầu cho mô hình phát triển hệ sinh thái.'
  },
  {
    id: 7,
    year: '2021',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/04/z6504231595844_5df4c0c47430f97a2d59f05da441513c.jpg',
    description: 'Năm 2021 ghi dấu một chặng đường "lịch sử" tại Hợp Lực – năm của bản lĩnh và nỗ lực bền bỉ, khi doanh nghiệp chính thức hoàn thành việc nâng vốn điều lệ lên 500 tỷ đồng. Cũng trong năm nay, hệ sinh thái Hợp Lực tiếp tục được mở rộng với sự gia nhập của ba đơn vị thành viên: Công ty Cổ phần Capplus, Công ty Cổ phần HL Windows và Công ty Cổ phần Cap Hưng Yên.'
  },
  {
    id: 8,
    year: '2022',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/04/z6504214384525_457c5215b91688894e837293dc9e9d4e.jpg',
    description: 'Với sự đoàn kết tập thể và tinh thần sẵn sàng đương đầu với thử thách, Hợp Lực đã vinh dự xếp hạng 173 trong "Top 500 Doanh nghiệp tư nhân lớn nhất Việt Nam" và xếp hạng 299 trong "Top 500 Doanh nghiệp lớn nhất Việt Nam".'
  },
  {
    id: 9,
    year: '2023',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/04/489510616_1220737666724699_6033988921662089157_n.jpg',
    description: 'Năm 2023, Công ty Cổ phần Xây dựng Hợp Lực tăng vốn điều lệ lên 750 tỷ đồng, sản lượng hợp nhất các công ty đạt 6.300 tỷ đồng. Hợp Lực tiếp tục nhận được sự tin tưởng cao từ các nhà đầu tư với hàng loạt các dự án lớn: Luxshare, Goertek, BYD, Sunny, DBG, Sông Hồng, SLP, Cayi, COT, Tân Việt, Shandong Innovation,…'
  },
  {
    id: 10,
    year: '2024',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/04/467983045_1107004098098057_9209642501231936192_n.jpg',
    description: 'Năm 2024, với quyết tâm cao độ và khát vọng vươn xa, các thành viên trong hệ sinh thái Hợp Lực đã hợp sức tạo nên những bước tiến bứt phá: Sản lượng hợp nhất vượt mốc 15.000 tỷ đồng, 30 dự án được thực hiện với tổng diện tích triển khai lên tới 4 triệu m² sàn, Quy mô nhân sự vượt 1.500 người, Đạt 26 triệu giờ làm việc an toàn.'
  },
  {
    id: 11,
    year: '2025',
    image: 'https://hopluccorp.vn/wp-content/uploads/2025/01/top-10-doanh-nghiep-1-scaled.jpg',
    description: 'Công ty Cổ phần Xây dựng Hợp Lực vinh dự đạt vị trí thứ 13 trong số các Doanh nghiệp Xây dựng lớn nhất Việt Nam năm 2024 và xếp hạng trong Top 10 Doanh nghiệp Xây dựng tư nhân lớn nhất Việt Nam năm 2024.'
  }
];

// Giá trị cốt lõi
export interface CoreValue {
  id: number;
  icon: string;
  title: string;
}

export const coreValues: CoreValue[] = [
  {
    id: 1,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/10/Layer-133.jpg',
    title: 'An toàn'
  },
  {
    id: 2,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/10/Layer-136.jpg',
    title: 'Tận tâm'
  },
  {
    id: 3,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/10/Layer-134.png',
    title: 'Chất lượng'
  },
  {
    id: 4,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/10/Layer-137.png',
    title: 'Cam kết'
  },
  {
    id: 5,
    icon: 'https://hopluccorp.vn/wp-content/uploads/2022/11/z3872431386585_a52a14d7cff9d599f352025f083f41a8.jpg',
    title: 'Trung thực'
  }
];

// Tầm nhìn & Sứ mệnh
export const visionMission = {
  vision: {
    title: 'Tầm nhìn',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/03/tam-nhin.jpg',
    content: 'Trở thành Nhà thầu EPC chuyên nghiệp hàng đầu tại Việt Nam. Hướng tới phát triển đa ngành nghề, đa lĩnh vực, trong đó lấy lĩnh vực thi công xây dựng làm chủ lực, tạo đà phát triển bền vững cho toàn bộ hệ thống.'
  },
  mission: {
    title: 'Sứ mệnh',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/03/su-menh-3.jpg',
    content: 'Tại Hợp Lực, chúng tôi tin tưởng rằng, giá trị bền vững và chân chính nhất đều xuất phát từ nguồn nhân lực, lấy con người là trọng tâm, là xuất phát điểm cho mọi sự phát triển. Để từ đó xây dựng một môi trường làm việc chuyên nghiệp, sáng tạo, nhiệt huyết cho đội ngũ nhân lực. Song song với đó, chúng tôi kiến tạo nên những giá trị bền vững bằng cả TÂM – TRÍ – LỰC, mang đến cho quý khách hàng những sản phẩm ưu việt và là tổ chức luôn chia sẻ trách nhiệm xã hội vì cộng đồng.'
  }
};

// Ban lãnh đạo
export interface Leader {
  id: number;
  name: string;
  position: string;
  image: string;
}

export const leadershipTeam: Leader[] = [
  {
    id: 1,
    name: 'Ông Lê Anh Hùng',
    position: 'Chủ tịch HĐQT',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/03/lanh-dao.jpg'
  },
  {
    id: 2,
    name: 'Ông Trần Ngọc Tân',
    position: 'Tổng Giám đốc',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/2.png'
  },
  {
    id: 3,
    name: 'Ông Lê Anh Dũng',
    position: 'Phó Chủ tịch HĐQT',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/4.png'
  },
  {
    id: 4,
    name: 'Ông Nguyễn Mạnh Hùng',
    position: 'Phó Chủ tịch HĐQT',
    image: 'https://hopluccorp.vn/wp-content/uploads/2023/02/3.png'
  }
];

// Background images
export const aboutBackgrounds = {
  coreValues: 'https://hopluccorp.vn/wp-content/uploads/2025/09/Backgroundx.png'
};
