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

  type BaseResponseCreateOutPaintingTaskResponse_ = {
    code?: number
    data?: CreateOutPaintingTaskResponse
    message?: string
  }

  type BaseResponseGetOutPaintingTaskResponse_ = {
    code?: number
    data?: GetOutPaintingTaskResponse
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

  type BaseResponseListImageSearchResult_ = {
    code?: number
    data?: ImageSearchResult[]
    message?: string
  }

  type BaseResponseListPictureVo_ = {
    code?: number
    data?: PictureVo[]
    message?: string
  }

  type BaseResponseListSpace_ = {
    code?: number
    data?: Space[]
    message?: string
  }

  type BaseResponseListSpaceCategoryAnalyzeVo_ = {
    code?: number
    data?: SpaceCategoryAnalyzeVo[]
    message?: string
  }

  type BaseResponseListSpaceLevelVo_ = {
    code?: number
    data?: SpaceLevelVo[]
    message?: string
  }

  type BaseResponseListSpaceSizeAnalyzeVo_ = {
    code?: number
    data?: SpaceSizeAnalyzeVo[]
    message?: string
  }

  type BaseResponseListSpaceTagAnalyzeVo_ = {
    code?: number
    data?: SpaceTagAnalyzeVo[]
    message?: string
  }

  type BaseResponseListSpaceUserAnalyzeVo_ = {
    code?: number
    data?: SpaceUserAnalyzeVo[]
    message?: string
  }

  type BaseResponseListSpaceUserVo_ = {
    code?: number
    data?: SpaceUserVo[]
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

  type BaseResponsePageResultCategory_ = {
    code?: number
    data?: PageResultCategory_
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

  type BaseResponsePageResultTag_ = {
    code?: number
    data?: PageResultTag_
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

  type BaseResponseSpaceUsageAnalyzeVo_ = {
    code?: number
    data?: SpaceUsageAnalyzeVo
    message?: string
  }

  type BaseResponseSpaceUser_ = {
    code?: number
    data?: SpaceUser
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

  type CategoryPageDto = {
    /** 当前页码 */
    current?: number
    /** 分类名称 */
    name?: string
    /** 页面大小 */
    pageSize?: number
  }

  type CategoryUpdateDto = {
    /** 主键ID */
    id?: number
    /** 分类名称 */
    name?: string
  }

  type CreateOutPaintingTaskResponse = {
    code?: string
    message?: string
    output?: Output
    requestId?: string
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

  type deleteSpaceUserByIdUsingDELETEParams = {
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

  type GetOutPaintingTaskResponse = {
    output?: Output1
    requestId?: string
  }

  type getOutPaintingTaskUsingGETParams = {
    /** taskId */
    taskId?: string
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

  type ImageSearchResult = {
    fromUrl?: string
    thumbUrl?: string
  }

  type Output = {
    taskId?: string
    taskStatus?: string
  }

  type Output1 = {
    code?: string
    endTime?: string
    message?: string
    outputImageUrl?: string
    scheduledTime?: string
    submitTime?: string
    taskId?: string
    taskMetrics?: TaskMetrics
    taskStatus?: string
  }

  type PageResultCategory_ = {
    /** 记录数据 */
    records?: Category[]
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

  type PageResultTag_ = {
    /** 记录数据 */
    records?: Tag[]
    /** 总记录数 */
    total?: number
  }

  type PageResultUserVo_ = {
    /** 记录数据 */
    records?: UserVo[]
    /** 总记录数 */
    total?: number
  }

  type Parameters = {
    addWatermark?: boolean
    angle?: number
    bestQuality?: boolean
    bottomOffset?: number
    leftOffset?: number
    limitImageSize?: boolean
    outputRatio?: string
    rightOffset?: number
    topOffset?: number
    xScale?: number
    yScale?: number
  }

  type Picture = {
    categoryId?: number
    createTime?: string
    editTime?: string
    introduction?: string
    isDelete?: number
    picColor?: string
    picFormat?: string
    picHeight?: number
    picId?: number
    picName?: string
    picScale?: number
    picSize?: number
    picUrl?: string
    picWidth?: number
    rawUrl?: string
    reviewMessage?: string
    reviewStatus?: number
    reviewTime?: string
    reviewerId?: number
    spaceId?: number
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

  type PictureCreateOutPaintingTaskDto = {
    parameters?: Parameters
    /** 图片ID */
    pictureId?: number
  }

  type PictureEditByBatchDto = {
    /** 分类ID */
    categoryId?: number
    /** 命名规则 */
    nameRule?: string
    /** 图片ID列表 */
    pictureIdList?: number[]
    /** 空间ID */
    spaceId?: number
    /** 标签ID列表 */
    tagIdList?: number[]
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

  type PictureSearchByColorDto = {
    /** 图片主色调 */
    picColor?: string
    /** 空间ID */
    spaceId?: number
  }

  type PictureSearchByPictureDto = {
    /** 图片ID */
    pictureId?: number
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
    /** 分类id */
    categoryId?: number
    /** 创建时间 */
    createTime?: string
    /** 编辑时间 */
    editTime?: string
    /** 简介 */
    introduction?: string
    /** 权限列表 */
    permissionList?: string[]
    /** 图片主色调 */
    picColor?: string
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
    /** 未转为 webp 格式的原始图片 url */
    rawUrl?: string
    /** 审核信息 */
    reviewMessage?: string
    /** 核状态：0-待审核；1-通过；2-拒绝 */
    reviewStatus?: number
    /** 审核时间 */
    reviewTime?: string
    /** 审核人ID */
    reviewerId?: number
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
    spaceType?: number
    totalCount?: number
    totalSize?: number
    updateTime?: string
    userId?: number
  }

  type SpaceCategoryAnalyzeDto = {
    /** 全空间分析 */
    queryAll?: boolean
    /** 是否查询公共图库 */
    queryPublic?: boolean
    /** 空间ID */
    spaceId?: number
  }

  type SpaceCategoryAnalyzeVo = {
    /** 图片分类 */
    category?: string
    /** 图片数量 */
    count?: number
    /** 分类图片总大小 */
    totalSize?: number
  }

  type SpaceCreateDto = {
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间名称 */
    spaceName?: string
    /** 空间类型：0-私有 1-团队 */
    spaceType?: number
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
    /** 空间类型：0-私有 1-团队 */
    spaceType?: number
    /** 创建用户 id */
    userId?: number
  }

  type SpaceRankAnalyzeDto = {
    /** 全空间分析 */
    queryAll?: boolean
    /** 是否查询公共图库 */
    queryPublic?: boolean
    /** 空间ID */
    spaceId?: number
    /** 排名前 N 的空间 */
    topN?: number
  }

  type SpaceSizeAnalyzeDto = {
    /** 全空间分析 */
    queryAll?: boolean
    /** 是否查询公共图库 */
    queryPublic?: boolean
    /** 空间ID */
    spaceId?: number
  }

  type SpaceSizeAnalyzeVo = {
    /** 图片数量 */
    count?: number
    /** 图片大小范围 */
    sizeRange?: string
  }

  type SpaceTagAnalyzeDto = {
    /** 全空间分析 */
    queryAll?: boolean
    /** 是否查询公共图库 */
    queryPublic?: boolean
    /** 空间ID */
    spaceId?: number
  }

  type SpaceTagAnalyzeVo = {
    /** 使用次数 */
    count?: number
    /** 标签名称 */
    tag?: string
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

  type SpaceUsageAnalyzeDto = {
    /** 全空间分析 */
    queryAll?: boolean
    /** 是否查询公共图库 */
    queryPublic?: boolean
    /** 空间ID */
    spaceId?: number
  }

  type SpaceUsageAnalyzeVo = {
    /** 图片数量占比 */
    countUsageRatio?: number
    /** 最大图片数量 */
    maxCount?: number
    /** 总大小 */
    maxSize?: number
    /** 空间使用比例 */
    sizeUsageRatio?: number
    /** 当前图片数量 */
    usedCount?: number
    /** 已使用大小 */
    usedSize?: number
  }

  type SpaceUser = {
    createTime?: string
    id?: number
    spaceId?: number
    spaceRole?: string
    updateTime?: string
    userId?: number
  }

  type SpaceUserAddDto = {
    spaceId?: number
    spaceRole?: string
    userId?: number
  }

  type SpaceUserAnalyzeDto = {
    /** 全空间分析 */
    queryAll?: boolean
    /** 是否查询公共图库 */
    queryPublic?: boolean
    /** 空间ID */
    spaceId?: number
    /** 时间纬度：day/week/month */
    timeDimension?: string
    /** 用户ID */
    userId?: number
  }

  type SpaceUserAnalyzeVo = {
    /** 上传数量 */
    count?: number
    /** 时间区间 */
    period?: string
  }

  type SpaceUserEditDto = {
    id?: number
    spaceRole?: string
  }

  type SpaceUserQueryDto = {
    id?: number
    spaceId?: number
    spaceRole?: string
    userId?: number
  }

  type SpaceUserVo = {
    /** 创建时间 */
    createTime?: string
    /** id */
    id?: number
    /** 空间 id */
    spaceId?: number
    /** 空间角色：viewer/editor/admin */
    spaceRole?: string
    spaceVo?: SpaceVo
    /** 更新时间 */
    updateTime?: string
    /** 用户 id */
    userId?: number
    userVo?: UserVo
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
    /** 权限列表 */
    permissionList?: string[]
    /** 空间级别：0-普通版 1-专业版 2-旗舰版 */
    spaceLevel?: number
    /** 空间名称 */
    spaceName?: string
    /** 空间类型：0-私有 1-团队 */
    spaceType?: number
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

  type TagPageDto = {
    /** 当前页码 */
    current?: number
    /** 标签名称 */
    name?: string
    /** 页面大小 */
    pageSize?: number
  }

  type TagUpdateDto = {
    /** 主键ID */
    id?: number
    /** 标签名称 */
    name?: string
  }

  type TaskMetrics = {
    failed?: number
    succeeded?: number
    total?: number
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
    /** 更新时间 */
    updateTime?: string
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
