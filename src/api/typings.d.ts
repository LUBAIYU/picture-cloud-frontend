declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BaseResponseInt_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponsePageResultPicture_ = {
    code?: number
    data?: PageResultPicture_
    message?: string
  }

  type BaseResponsePageResultPictureVo_ = {
    code?: number
    data?: PageResultPictureVo_
    message?: string
  }

  type BaseResponsePageResultUserVo_ = {
    code?: number
    data?: PageResultUserVo_
    message?: string
  }

  type BaseResponsePicture_ = {
    code?: number
    data?: Picture
    message?: string
  }

  type BaseResponsePictureTagCategoryVo_ = {
    code?: number
    data?: PictureTagCategoryVo
    message?: string
  }

  type BaseResponsePictureVo_ = {
    code?: number
    data?: PictureVo
    message?: string
  }

  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BaseResponseUser_ = {
    code?: number
    data?: User
    message?: string
  }

  type BaseResponseUserLoginVo_ = {
    code?: number
    data?: UserLoginVo
    message?: string
  }

  type BaseResponseUserVo_ = {
    code?: number
    data?: UserVo
    message?: string
  }

  type deletePictureByIdUsingDELETEParams = {
    /** picId */
    picId: number
  }

  type deleteUserByIdsUsingDELETEParams = {
    /** ids */
    ids: number[]
  }

  type freezeBatchUsersUsingGETParams = {
    /** ids */
    ids: number[]
  }

  type getPictureByIdUsingGETParams = {
    /** picId */
    picId: number
  }

  type getPictureVoByIdUsingGETParams = {
    /** picId */
    picId: number
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getUserVoByIdUsingGETParams = {
    /** id */
    id: number
  }

  type PageResultPicture_ = {
    /** 记录数据 */
    records?: Picture[]
    /** 总记录数 */
    total?: number
  }

  type PageResultPictureVo_ = {
    /** 记录数据 */
    records?: PictureVo[]
    /** 总记录数 */
    total?: number
  }

  type PageResultUserVo_ = {
    /** 记录数据 */
    records?: UserVo[]
    /** 总记录数 */
    total?: number
  }

  type Picture = {
    category?: string
    createTime?: string
    editTime?: string
    introduction?: string
    isDelete?: number
    picFormat?: string
    picHeight?: number
    picId?: string
    picName?: string
    picScale?: number
    picSize?: number
    picUrl?: string
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    tags?: string
    updateTime?: string
    userId?: string
  }

  type PictureBatchDto = {
    /** 抓取数量 */
    count?: number
    /** 图片名称前缀 */
    namePrefix?: string
    /** 搜索关键词 */
    searchText?: string
  }

  type PictureEditDto = {
    /** 分类 */
    category?: string
    /** 简介 */
    introduction?: string
    /** 图片ID */
    picId?: number
    /** 图片名称 */
    picName?: string
    /** 标签列表 */
    tagList?: string[]
  }

  type PicturePageDto = {
    /** 分类 */
    category?: string
    /** 当前页码 */
    current?: number
    /** 简介 */
    introduction?: string
    /** 页面大小 */
    pageSize?: number
    /** 图片名称 */
    picName?: string
    /** 审核信息 */
    reviewMessage?: string
    /** 审核状态：0-待审核；1-通过；2-拒绝 */
    reviewStatus?: number
    /** 搜索关键词 */
    searchText?: string
    /** 标签列表 */
    tagList?: string[]
  }

  type PictureReviewDto = {
    /** ID */
    id?: number
    /** 审核信息 */
    reviewMessage?: string
    /** 审核状态：0-待审核；1-通过；2-拒绝 */
    reviewStatus?: number
  }

  type PictureTagCategoryVo = {
    /** 分类列表 */
    categoryList?: string[]
    /** 标签列表 */
    tagList?: string[]
  }

  type PictureUpdateDto = {
    /** 分类 */
    category?: string
    /** 简介 */
    introduction?: string
    /** 图片ID */
    picId?: number
    /** 图片名称 */
    picName?: string
    /** 标签列表 */
    tagList?: string[]
  }

  type PictureUploadDto = {
    /** 图片URL */
    fileUrl?: string
    /** 图片ID */
    picId?: number
    /** 图片名称 */
    picName?: string
  }

  type PictureVo = {
    /** 分类 */
    category?: string
    /** 创建时间 */
    createTime?: string
    /** 编辑时间 */
    editTime?: string
    /** 简介 */
    introduction?: string
    /** 图片格式 */
    picFormat?: string
    /** 图片高度 */
    picHeight?: number
    /** 图片ID */
    picId?: string
    /** 图片名称 */
    picName?: string
    /** 图片宽高比例 */
    picScale?: number
    /** 图片体积 */
    picSize?: number
    /** 图片url */
    picUrl?: string
    /** 图片宽度 */
    picWidth?: number
    /** 标签（列表） */
    tagList?: string[]
    /** 更新时间 */
    updateTime?: string
    /** 创建用户ID */
    userId?: number
    userVo?: UserVo
  }

  type testFileDownloadUsingGETParams = {
    /** filePath */
    filePath?: string
  }

  type uploadPictureUsingPOSTParams = {
    /** 图片URL */
    fileUrl?: string
    /** 图片ID */
    picId?: number
    /** 图片名称 */
    picName?: string
  }

  type User = {
    createTime?: string
    editTime?: string
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userId?: number
    userName?: string
    userPassword?: string
    userProfile?: string
    userRole?: number
    userStatus?: number
  }

  type UserLoginDto = {
    /** 账号 */
    userAccount?: string
    /** 密码 */
    userPassword?: string
  }

  type UserLoginVo = {
    /** 登录令牌 */
    token?: string
  }

  type UserPageDto = {
    /** 当前页码 */
    current?: number
    /** 页面大小 */
    pageSize?: number
    /** 账号 */
    userAccount?: string
    /** 用户昵称 */
    userName?: string
    /** 用户角色：0-管理员/1-用户 */
    userRole?: number
    /** 用户状态：0-不可用/1-可用 */
    userStatus?: number
  }

  type UserRegisterDto = {
    /** 确认密码 */
    checkPassword?: string
    /** 账号 */
    userAccount?: string
    /** 密码 */
    userPassword?: string
  }

  type UserUpdateDto = {
    /** 账号 */
    userAccount?: string
    /** 用户头像 */
    userAvatar?: string
    /** ID */
    userId?: number
    /** 用户昵称 */
    userName?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：0-管理员/1-用户 */
    userRole?: number
  }

  type UserVo = {
    /** 创建时间 */
    createTime?: string
    /** 账号 */
    userAccount?: string
    /** 用户头像 */
    userAvatar?: string
    /** ID */
    userId?: string
    /** 用户昵称 */
    userName?: string
    /** 用户简介 */
    userProfile?: string
    /** 用户角色：0-管理员/1-用户 */
    userRole?: number
    /** 用户状态：0-不可用/1-可用 */
    userStatus?: number
  }
}
