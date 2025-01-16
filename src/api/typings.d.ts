declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BaseResponseCategory_ = {
    code?: number
    data?: Category
    message?: string
  }

  type BaseResponseInt_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponseListCategoryListVo_ = {
    code?: number
    data?: CategoryListVo[]
    message?: string
  }

  type BaseResponseListSpaceLevelVo_ = {
    code?: number
    data?: SpaceLevelVo[]
    message?: string
  }

  type BaseResponseListTagListVo_ = {
    code?: number
    data?: TagListVo[]
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

  type BaseResponsePageResultSpace_ = {
    code?: number
    data?: PageResultSpace_
    message?: string
  }

  type BaseResponsePageResultSpaceVo_ = {
    code?: number
    data?: PageResultSpaceVo_
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

  type BaseResponseSpace_ = {
    code?: number
    data?: Space
    message?: string
  }

  type BaseResponseSpaceVo_ = {
    code?: number
    data?: SpaceVo
    message?: string
  }

  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BaseResponseTag_ = {
    code?: number
    data?: Tag
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

  type Category = {
    createTime?: string
    id?: number
    isDelete?: number
    name?: string
    updateTime?: string
  }

  type CategoryListVo = {
    /** 主键ID */
    id?: number
    /** 分类名称 */
    name?: string
  }

  type CategoryUpdateDto = {
    /** 主键ID */
    id?: number
    /** 分类名称 */
    name?: string
  }

  type delBatchCategoryUsingDELETEParams = {
    /** ids */
    ids: number[]
  }

  type delBatchTagUsingDELETEParams = {
    /** ids */
    ids: number[]
  }

  type deletePictureByIdUsingDELETEParams = {
    /** picId */
    picId: number
  }

  type deleteSpaceByIdUsingDELETEParams = {
    /** id */
    id: number
  }

  type deleteUserByIdsUsingDELETEParams = {
    /** ids */
    ids: number[]
  }

  type freezeBatchUsersUsingGETParams = {
    /** ids */
    ids: number[]
  }

  type getCategoryByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getPictureByIdUsingGETParams = {
    /** picId */
    picId: number
  }

  type getPictureVoByIdUsingGETParams = {
    /** picId */
    picId: number
  }

  type getSpaceByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getSpaceVoByIdUsingGETParams = {
    /** id */
    id: number
  }

  type getTagByIdUsingGETParams = {
    /** id */
    id: number
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

  type PageResultSpace_ = {
    /** 记录数据 */
    records?: Space[]
    /** 总记录数 */
    total?: number
  }

  type PageResultSpaceVo_ = {
    /** 记录数据 */
    records?: SpaceVo[]
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
    picId?: number
    picName?: string
    picScale?: number
    picSize?: number
    picUrl?: string
    picWidth?: number
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    spaceId?: number
    tags?: string
    thumbnailUrl?: string
    updateTime?: string
    userId?: number
  }

  type PictureBatchDto = {
    /** 抓取数量 */
    count?: number
    /** 图片名称前缀 */
    namePrefix?: string
    /** 搜索关键词 */
    searchText?: string
  }

  type PicturePageDto = {
    /** 分类 */
    category?: string
    /** 当前页码 */
    current?: number
    /** 结束编辑时间 */
    endEditTime?: string
    /** 简介 */
    introduction?: string
    /** 是否只查询 spaceId 为 null 的数据 */
    nullSpaceId?: boolean
    /** 页面大小 */
    pageSize?: number
    /** 图片格式 */
    picFormat?: string
    /** 图片名称 */
    picName?: string
    /** 审核信息 */
    reviewMessage?: string
    /** 审核状态：0-待审核；1-通过；2-拒绝 */
    reviewStatus?: number
    /** 搜索关键词 */
    searchText?: string
    /** 空间ID */
    spaceId?: number
    /** 开始编辑时间 */
    startEditTime?: string
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
    /** 分类ID */
    categoryId?: number
    /** 简介 */
    introduction?: string
    /** 图片ID */
    picId?: number
    /** 图片名称 */
    picName?: string
    /** 空间ID */
    spaceId?: number
    /** 标签ID列表 */
    tagIdList?: number[]
  }

  type PictureUploadDto = {
    /** 图片URL */
    fileUrl?: string
    /** 图片ID */
    picId?: number
    /** 图片名称 */
    picName?: string
    /** 空间ID */
    spaceId?: number
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
    picId?: number
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
    /** 空间 id（为空表示公共空间） */
    spaceId?: number
    /** 标签（列表） */
    tagList?: string[]
    /** 缩略图url */
    thumbnailUrl?: string
    /** 更新时间 */
    updateTime?: string
    /** 创建用户ID */
    userId?: number
    userVo?: UserVo
  }

  type Space = {
    createTime?: string
    editTime?: string
    id?: number
    isDelete?: number
    maxCount?: number
    maxSize?: number
    spaceLevel?: number
    spaceName?: string
    totalCount?: number
    totalSize?: number
    updateTime?: string
    userId?: number
  }

  type SpaceCreateDto = {
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间名称 */
    spaceName?: string
  }

  type SpaceEditDto = {
    /** id */
    id?: number
    /** 空间名称 */
    spaceName?: string
  }

  type SpaceLevelVo = {
    /** 最大条数 */
    maxCount?: number
    /** 最大容量 */
    maxSize?: number
    /** 空间级别 */
    text?: string
    /** 索引值 */
    value?: number
  }

  type SpacePageDto = {
    /** 当前页码 */
    current?: number
    /** 页面大小 */
    pageSize?: number
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间名称 */
    spaceName?: string
    /** 创建用户 id */
    userId?: number
  }

  type SpaceUpdateDto = {
    /** id */
    id?: number
    /** 空间图片的最大数量 */
    maxCount?: number
    /** 空间图片的最大总大小 */
    maxSize?: number
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间名称 */
    spaceName?: string
  }

  type SpaceVo = {
    /** 创建时间 */
    createTime?: string
    /** 编辑时间 */
    editTime?: string
    /** id */
    id?: number
    /** 空间图片的最大数量 */
    maxCount?: number
    /** 空间图片的最大总大小 */
    maxSize?: number
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间名称 */
    spaceName?: string
    /** 当前空间下的图片数量 */
    totalCount?: number
    /** 当前空间下图片的总大小 */
    totalSize?: number
    /** 更新时间 */
    updateTime?: string
    /** 创建用户 id */
    userId?: number
    userVo?: UserVo
  }

  type Tag = {
    createTime?: string
    id?: number
    isDelete?: number
    name?: string
    updateTime?: string
    useCount?: number
  }

  type TagListVo = {
    /** 主键ID */
    id?: number
    /** 标签名称 */
    name?: string
  }

  type TagUpdateDto = {
    /** 主键ID */
    id?: number
    /** 标签名称 */
    name?: string
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
    /** 空间ID */
    spaceId?: number
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
    userId?: number
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
