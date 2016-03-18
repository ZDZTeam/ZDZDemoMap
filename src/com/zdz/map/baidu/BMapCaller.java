package com.zdz.map.baidu;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.BaiduMap.OnMapLoadedCallback;
import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.MyLocationConfiguration;
import com.baidu.mapapi.map.MyLocationConfiguration.LocationMode;
import com.baidu.mapapi.model.LatLng;
import com.baidu.mapapi.overlayutil.PoiOverlay;
import com.baidu.mapapi.search.core.PoiInfo;
import com.baidu.mapapi.search.core.SearchResult;
import com.baidu.mapapi.search.poi.OnGetPoiSearchResultListener;
import com.baidu.mapapi.search.poi.PoiCitySearchOption;
import com.baidu.mapapi.search.poi.PoiDetailResult;
import com.baidu.mapapi.search.poi.PoiNearbySearchOption;
import com.baidu.mapapi.search.poi.PoiResult;
import com.baidu.mapapi.search.poi.PoiSearch;
import com.baidu.mapapi.search.sug.OnGetSuggestionResultListener;
import com.baidu.mapapi.search.sug.SuggestionResult;
import com.baidu.mapapi.search.sug.SuggestionResult.SuggestionInfo;
import com.baidu.mapapi.search.sug.SuggestionSearch;
import com.baidu.mapapi.search.sug.SuggestionSearchOption;
import com.zdzsoft.lib.ui.caller.ZDZViewCaller;

/**
 * 百度地图代理类
 * 
 * @author zdzsoft
 * @link www.zdzsoft.com
 * @Copyright BeiJing ZDZ Tech Co.LTD
 */
public class BMapCaller extends ZDZViewCaller {
	private MapView mapView;
	private BitmapDescriptor marker;
	private boolean mapLoad = false;
	private boolean maplocation = false;
	private LocationClient location = null;
	private String city = "北京";
	private boolean citySearch = false;
	private PoiSearch search = null;
	private String searchkey;
	private double searchx, searchy;
	private PoiResult poiresult;
	private BMapPoiOverlay overlay;
	private int load_index = 0;
	private int click_pos = 0;
	private SuggestionSearch suggestionSearch = null;
	private SuggestionResult suggestionresult;

	public BMapCaller(MapView mapView) {
		this.mapView = mapView;
		mapView.getMap().setOnMapLoadedCallback(new OnMapLoadedCallback() {
			@Override
			public void onMapLoaded() {
				mapLoad = true;
				webPageAttrCallback("loadCallback", mapLoad);
			}
		});
	}

	/**
	 * 设置地图加载的回调函数
	 * 
	 * @param callback
	 *            回调函数
	 */
	public void setPageLoadCallback(String callback) {
		setAttr("loadCallback", callback);
		if (mapLoad) {
			webPageAttrCallback("loadCallback", mapLoad);
		}
	}

	/**
	 * 判断地图是否加载完成
	 * 
	 * @return
	 */
	public boolean isLoad() {
		return mapLoad;
	}

	/**
	 * 获取地图中心点x
	 * 
	 * @return
	 */
	public double getCenterX() {
		return mapView.getMap().getMapStatus().target.longitude;
	}

	/**
	 * 获取地图中心点x
	 * 
	 * @return
	 */
	public double getCenterY() {
		return mapView.getMap().getMapStatus().target.latitude;
	}

	/**
	 * 设置地图中心的
	 * 
	 * @param x
	 *            经度
	 * @param y
	 *            纬度
	 */
	public void setCenter(double x, double y) {
		LatLng position = new LatLng(y, x);
		MapStatusUpdate update = MapStatusUpdateFactory.newLatLng(position);
		mapView.getMap().setMapStatus(update);
	}

	/**
	 * 获取地图中心点x
	 * 
	 * @return
	 */
	public double getLocationX() {
		return mapView.getMap().getLocationData().longitude;
	}

	/**
	 * 获取地图中心点x
	 * 
	 * @return
	 */
	public double getLocationY() {
		return mapView.getMap().getLocationData().latitude;
	}

	/**
	 * 获取方向
	 * 
	 * @return
	 */
	public double getDirection() {
		return mapView.getMap().getLocationData().direction;
	}

	/**
	 * 获取速度
	 * 
	 * @return
	 */
	public double getSpeed() {
		return mapView.getMap().getLocationData().speed;
	}

	/**
	 * 获取卫星数量
	 * 
	 * @return
	 */
	public int getSatelite() {
		return mapView.getMap().getLocationData().satellitesNum;
	}

	/**
	 * 获取定位精度
	 * 
	 * @return
	 */
	public double getAccuracy() {
		return mapView.getMap().getLocationData().accuracy;
	}

	/**
	 * 设置定位成功后的回调函数
	 * 
	 * @param callback
	 *            回调函数，回调参数：x, y, address, city code, city
	 */
	public void setLocationCallback(String callback) {
		setAttr("locationback", callback);
	}

	/**
	 * 定位当前位置
	 */
	public void location() {
		if (!maplocation) {
			BaiduMap map = mapView.getMap();
			map.setMyLocationEnabled(true);
			marker = BitmapDescriptorFactory.fromResource(R.drawable.icon_geo);
			map.setMyLocationConfigeration(new MyLocationConfiguration(LocationMode.NORMAL, true, marker));
			location = new LocationClient(context);
			location.registerLocationListener(new BDLocationListener() {
				@Override
				public void onReceiveLocation(BDLocation loc) {
					if (mapView != null && location != null) {
						stopLocation();
						setCenter(loc.getLongitude(), loc.getLatitude());
						String lcity = loc.getCity();
						if (lcity == null) {
							lcity = "";
						}
						if (lcity.length() > 0) {
							city = lcity;
						}
						String lcode = loc.getCityCode();
						if (lcode == null) {
							lcode = "";
						}
						webPageAttrCallback("locationback", loc.getLongitude(), loc.getLatitude(), loc.getAddrStr(), lcode, lcity);
					}
				}
			});
			LocationClientOption option = new LocationClientOption();
			option.setOpenGps(true); // 打开gps
			option.setCoorType("bd09ll"); // 设置坐标类型
			option.setScanSpan(1000);
			location.setLocOption(option);
			maplocation = true;
		}
		if (location != null) {
			location.start();
		}
	}

	/**
	 * 停止定位
	 */
	public void stopLocation() {
		if (location != null) {
			location.stop();
			BaiduMap map = mapView.getMap();
			map.setMyLocationEnabled(false);
		}
	}

	/**
	 * 销毁
	 */
	public void destory() {
		stopLocation();
		location = null;
		if (suggestionSearch != null) {
			suggestionSearch.destroy();
			suggestionSearch = null;
		}
		if (search != null) {
			search.destroy();
			search = null;
		}
		mapView = null;
	}

	/**
	 * 获取当前城市
	 * 
	 * @return
	 */
	public String getCity() {
		return city;
	}

	/**
	 * 设置当前城市
	 * 
	 * @param city
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * 搜索关键字成功后的回调函数
	 * 
	 * @param callback
	 *            回调函数
	 */
	public void setSurggestCallback(String callback) {
		setAttr("suggestionback", callback);
	}

	/**
	 * 获取搜索的总记录数
	 * 
	 * @return
	 */
	public int getSurggestTotal() {
		return suggestionresult == null ? 0 : suggestionresult.getAllSuggestions().size();
	}

	/**
	 * 获取查询记录
	 * 
	 * @param pos
	 * @return
	 */
	public String getSurggestResult(int pos) {
		if (suggestionresult != null && pos < suggestionresult.getAllSuggestions().size()) {
			startJson();
			SuggestionInfo info = suggestionresult.getAllSuggestions().get(pos);
			addJsonObj();
			addJsonAttr("key", info.key);
			addJsonAttr("district", info.district);
			addJsonAttr("city", info.city);
			addJsonAttr("x", info.pt.longitude);
			addJsonAttr("y", info.pt.latitude);
			addJsonEnd();
			String json = stopJson();
			return json;
		}
		return "";
	}

	/**
	 * 搜索关键字匹配列表
	 * 
	 * @param key
	 *            关键字
	 */
	public void getSurggest(String key) {
		if (suggestionSearch == null) {
			suggestionSearch = SuggestionSearch.newInstance();
			suggestionSearch.setOnGetSuggestionResultListener(new OnGetSuggestionResultListener() {
				@Override
				public void onGetSuggestionResult(SuggestionResult result) {
					if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
						webPageAttrCallback("suggestionback", -1);
					} else if (result.getAllSuggestions().isEmpty()) {
						webPageAttrCallback("suggestionback", 0);
					} else {
						suggestionresult = result;
						/*
						 * startJson(); addJsonAry(); for (int i = 0; i < result.getAllSuggestions().size(); i++) { SuggestionInfo info = result.getAllSuggestions().get(i); addJsonObj();
						 * addJsonAttr("key", info.key); addJsonAttr("district", info.district); addJsonAttr("city", info.city); addJsonAttr("x", info.pt.longitude); addJsonAttr("y",
						 * info.pt.latitude); addJsonEnd(); } String json = stopJson();
						 */
						webPageAttrCallback("suggestionback", result.getAllSuggestions().size());
					}
				}
			});
		}
		suggestionresult = null;
		if (suggestionSearch != null) {
			if (city != null && city.length() > 0) {
				suggestionSearch.requestSuggestion(new SuggestionSearchOption().keyword(key).city(city));
			} else {
				suggestionSearch.requestSuggestion(new SuggestionSearchOption().keyword(key));
			}
		}
	}

	/**
	 * 搜索关键字成功后的回调函数
	 * 
	 * @param callback
	 *            回调函数
	 */
	public void setSearchCallback(String callback) {
		setAttr("searchback", callback);
	}

	/**
	 * 点击记录时回调函数
	 * 
	 * @param callback
	 *            回调函数
	 */
	public void setSearchClickback(String callback) {
		setAttr("searchclickback", callback);
	}

	/**
	 * 回调点击事件
	 * 
	 * @param pos
	 */
	public void onSearchClick(int pos) {
		click_pos = pos;
		if (poiresult != null && 0 <= pos && pos < poiresult.getAllPoi().size()) {
			startJson();
			PoiInfo info = poiresult.getAllPoi().get(pos);
			addJsonObj();
			addJsonAttr("name", info.name);
			addJsonAttr("address", info.address);
			addJsonAttr("phone", info.phoneNum);
			addJsonAttr("city", info.city);
			addJsonAttr("type", info.type);
			addJsonAttr("x", info.location.longitude);
			addJsonAttr("y", info.location.latitude);
			addJsonEnd();
			String json = stopJson();
			webPageAttrCallback("searchclickback", pos, json);
		}
	}

	/**
	 * 定位到指定记录
	 * 
	 * @param pos
	 */
	public void showSearchItem(int pos) {
		click_pos = pos;
		if (poiresult != null && 0 <= pos && pos < poiresult.getAllPoi().size()) {
			overlay.zoomToSpan(pos);
		}
	}

	/**
	 * 获得点击的记录
	 * 
	 * @return
	 */
	public String getSearchClickItem() {
		if (poiresult != null && 0 <= click_pos && click_pos < poiresult.getAllPoi().size()) {
			return getSearchResult(click_pos);
		}
		return "";
	}

	/**
	 * 获取关键字
	 * 
	 * @return
	 */
	public String getSearchKey() {
		return searchkey;
	}

	/**
	 * 获取点击的记录索引
	 * 
	 * @return
	 */
	public int getClickItem() {
		return click_pos;
	}

	/**
	 * 获取搜索的总记录数
	 * 
	 * @return
	 */
	public int getSearchTotal() {
		return poiresult == null ? 0 : poiresult.getTotalPoiNum();
	}

	/**
	 * 获取当前页面下标
	 * 
	 * @return
	 */
	public int getSearchPage() {
		return poiresult == null ? 0 : poiresult.getCurrentPageNum();
	}

	/**
	 * 获取当前页面数量
	 * 
	 * @return
	 */
	public int getSearchPageCount() {
		return poiresult == null ? 0 : poiresult.getAllPoi().size();
	}

	/**
	 * 获取每页最大数量
	 * 
	 * @return
	 */
	public int getSearchPageCapacity() {
		return poiresult == null ? 0 : poiresult.getCurrentPageCapacity();
	}

	/**
	 * 获取查询记录
	 * 
	 * @param pos
	 * @return
	 */
	public String getSearchResult(int pos) {
		if (poiresult != null && pos < poiresult.getAllPoi().size()) {
			startJson();
			PoiInfo info = poiresult.getAllPoi().get(pos);
			addJsonObj();
			addJsonAttr("name", info.name);
			addJsonAttr("address", info.address);
			addJsonAttr("phone", info.phoneNum);
			addJsonAttr("city", info.city);
			addJsonAttr("type", info.type);
			addJsonAttr("x", info.location.longitude);
			addJsonAttr("y", info.location.latitude);
			addJsonEnd();
			String json = stopJson();
			return json;
		}
		return "";
	}

	/**
	 * 搜索关键字
	 * 
	 * @param key
	 *            关键字
	 */
	public void searchKey(String key) {
		if (search == null) {
			search = PoiSearch.newInstance();
			final BMapCaller caller = this;
			search.setOnGetPoiSearchResultListener(new OnGetPoiSearchResultListener() {

				@Override
				public void onGetPoiResult(PoiResult result) {
					poiresult = result;
					if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
						webPageAttrCallback("searchback", -1);
					} else if (result.error == SearchResult.ERRORNO.RESULT_NOT_FOUND) {
						webPageAttrCallback("searchback", 0);
					} else {
						int size = result.getAllPoi().size();
						/*
						 * startJson(); addJsonAry(); for (int i = 0; i < size; i++) { PoiInfo info = result.getAllPoi().get(i); addJsonObj(); addJsonAttr("name", info.name); addJsonAttr("address",
						 * info.address); addJsonAttr("phone", info.phoneNum); addJsonAttr("city", info.city); addJsonAttr("type", info.type); addJsonAttr("x", info.location.longitude);
						 * addJsonAttr("y", info.location.latitude); addJsonEnd(); } String json = stopJson();
						 */
						webPageAttrCallback("searchback", size, result.getTotalPoiNum(), result.getCurrentPageNum(), result.getTotalPageNum(), result.getCurrentPageCapacity());
						mapView.getMap().clear();
						overlay = new BMapPoiOverlay(mapView.getMap(), caller, search);
						mapView.getMap().setOnMarkerClickListener(overlay);
						overlay.setData(result);
						overlay.addToMap();
						overlay.zoomToSpan();
					}
				}

				@Override
				public void onGetPoiDetailResult(PoiDetailResult result) {
				}
			});
		}
		searchkey = key;
		searchx = searchy = 0;
		load_index = 0;
		poiresult = null;
		if (search != null) {
			searchNextKey();
		}
	}

	/**
	 * 检索位置
	 * 
	 * @param key
	 *            位置
	 * @param x
	 *            坐标
	 * @param y
	 *            坐标
	 */
	public void searchLocation(String key, double x, double y) {
		if (search == null) {
			search = PoiSearch.newInstance();
			final BMapCaller caller = this;
			search.setOnGetPoiSearchResultListener(new OnGetPoiSearchResultListener() {

				@Override
				public void onGetPoiResult(PoiResult result) {
					poiresult = result;
					if (result == null || result.error != SearchResult.ERRORNO.NO_ERROR) {
						webPageAttrCallback("searchback", -1);
					} else if (result.error == SearchResult.ERRORNO.RESULT_NOT_FOUND) {
						webPageAttrCallback("searchback", 0);
					} else {
						int size = result.getAllPoi().size();
						/*
						 * startJson(); addJsonAry(); for (int i = 0; i < size; i++) { PoiInfo info = result.getAllPoi().get(i); addJsonObj(); addJsonAttr("name", info.name); addJsonAttr("address",
						 * info.address); addJsonAttr("phone", info.phoneNum); addJsonAttr("city", info.city); addJsonAttr("type", info.type); addJsonAttr("x", info.location.longitude);
						 * addJsonAttr("y", info.location.latitude); addJsonEnd(); } String json = stopJson();
						 */
						webPageAttrCallback("searchback", size, result.getTotalPoiNum(), result.getCurrentPageNum(), result.getTotalPageNum(), result.getCurrentPageCapacity());
						mapView.getMap().clear();
						overlay = new BMapPoiOverlay(mapView.getMap(), caller, search);
						mapView.getMap().setOnMarkerClickListener(overlay);
						overlay.setData(result);
						overlay.addToMap();
						overlay.zoomToSpan();
					}
				}

				@Override
				public void onGetPoiDetailResult(PoiDetailResult result) {
				}
			});
		}
		searchkey = key;
		searchx = x;
		searchy = y;
		load_index = 0;
		poiresult = null;
		if (search != null) {
			searchNextKey();
		}
	}

	/**
	 * 上一页
	 */
	public void getPrevSearch() {
		if (load_index > 0 && search != null) {
			load_index--;
			poiresult = null;
			searchNextKey();
		}
	}

	/**
	 * 下一页
	 */
	public void getNextSearch() {
		if (search != null) {
			load_index++;
			poiresult = null;
			searchNextKey();
		}
	}

	private void searchNextKey() {
		if (load_index < 0) {
			load_index = 0;
		}
		if (poiresult != null) {
			if (load_index >= poiresult.getTotalPageNum()) {
				load_index = load_index - 1;
			}
		}
		if (citySearch && city != null && city.length() > 0) {
			search.searchInCity(new PoiCitySearchOption().city(city).keyword(searchkey).pageNum(load_index).pageCapacity(PoiOverlay.MAX_POI_SIZE));
		} else {
			LatLng position;
			if (searchx != 0 && searchy != 0) {
				position = new LatLng(searchy, searchx);
			} else {
				double x = getCenterX();
				double y = getCenterY();
				position = new LatLng(y, x);
			}
			search.searchNearby(new PoiNearbySearchOption().location(position).radius(5000).keyword(searchkey).pageNum(load_index).pageCapacity(PoiOverlay.MAX_POI_SIZE));
		}
	}
}
