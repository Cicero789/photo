import { describe, it, expect } from 'vitest';
import { serializeUser } from '../../serializers/user.js';
import { serializeEvent } from '../../serializers/event.js';
import { serializePhoto } from '../../serializers/photo.js';
import { serializeAlbum } from '../../serializers/album.js';
import { serializeProfessional } from '../../serializers/professional.js';
import { serializeInspiration } from '../../serializers/inspiration.js';
import { serializeClientSite, serializeBlogPost } from '../../serializers/client.js';
import type { UserRow, EventRow, PhotoRow, AlbumRow, ProfessionalRow, InspirationRow, ClientSiteRow, BlogPostRow } from '@framenest/shared';

describe('serializers', () => {
  it('serializeUser converts snake_case to camelCase', () => {
    const row: UserRow = {
      id: 'usr_test', email: 'test@test.com', name: 'Test User', role: 'staff',
      space_id: 'spc_test', avatar_url: null, account_type: 'personal',
      token_version: 1, password_hash: 'hash', created_at: '2026-01-01',
    };
    const result = serializeUser(row);
    expect(result.id).toBe('usr_test');
    expect(result.spaceId).toBe('spc_test');
    expect(result.accountType).toBe('personal');
    expect(result.avatarUrl).toBeNull();
    // Verify snake_case keys don't leak
    expect((result as unknown as Record<string, unknown>)['space_id']).toBeUndefined();
  });

  it('serializeEvent handles all fields', () => {
    const row = {
      id: 'evt_1', space_id: 'spc_1', title: 'Wedding', category: 'wedding',
      event_date: '2026-07-01', description: 'Beach wedding', ai_summary: null,
      cover_photo_id: null, created_at: '2026-01-01', updated_at: '2026-01-01',
      address: '123 Beach Rd', address_locked: 0, latitude: 34.0, longitude: -118.0,
      payment_model: 'prepaid', visibility: 'public', deleted_at: null,
      photo_count: 5, cover_url: undefined,
    } as EventRow & { photo_count?: number; cover_url?: string };
    const result = serializeEvent(row);
    expect(result.visibility).toBe('public');
    expect(result.latitude).toBe(34.0);
    expect(result.addressLocked).toBe(false);
    expect(result.photoCount).toBe(5);
  });

  it('serializePhoto converts favorite to boolean', () => {
    const row = {
      id: 'pho_1', event_id: 'evt_1', space_id: 'spc_1',
      original_filename: 'photo.jpg', storage_key: 'events/evt_1/pho_1.jpg',
      thumbnail_key: null, width: 1920, height: 1080, file_size: 500000,
      latitude: null, longitude: null, taken_at: null, uploaded_by: 'usr_1',
      created_at: '2026-01-01', favorite: 1, license: 'personal', deleted_at: null,
    } as PhotoRow;
    const result = serializePhoto(row);
    expect(result.favorite).toBe(true);
    expect(result.originalFilename).toBe('photo.jpg');
  });

  it('serializeAlbum maps allow_downloads to allowDownloads', () => {
    const row = {
      id: 'alb_1', user_id: 'usr_1', name: 'Summer', share_token: 'tok_1',
      password: 'hash', allow_downloads: 1, expires_at: null, view_count: 10,
      created_at: '2026-01-01', deleted_at: null, photo_count: 3,
    } as AlbumRow & { photo_count: number };
    const result = serializeAlbum(row);
    expect(result.allowDownloads).toBe(true);
    expect(result.hasPassword).toBe(true);
    expect(result.viewCount).toBe(10);
  });

  it('serializeProfessional parses JSON fields', () => {
    const row = {
      id: 'pro_1', name: 'Jane Photog', email: 'jane@test.com',
      website: null, portfolio_url: null, service_area: 'NYC', bio: 'Pro photographer',
      status: 'approved', hero_photos: '["url1","url2"]',
      stripe_config: '{}', pricing_config: '{"single":100}',
      template_config: '{"template":"1-clean"}',
      slug: 'jane-photog', specialties: '["wedding","portrait"]', tagline: 'Capturing moments',
      verified: 1, verified_at: '2026-01-01', subscription_id: 'sub_1',
      subscription_status: 'active', profile_views: 500, featured: 1,
      created_at: '2026-01-01',
    } as ProfessionalRow;
    const result = serializeProfessional(row);
    expect(result.verified).toBe(true);
    expect(result.specialties).toEqual(['wedding', 'portrait']);
    expect(result.heroPhotos).toEqual(['url1', 'url2']);
    expect(result.templateConfig).toEqual({ template: '1-clean' });
    expect(result.pricingConfig).toEqual({ single: 100 });
  });

  it('serializeInspiration maps love_count', () => {
    const row = {
      id: 'ins_1', user_id: 'usr_1', photo_url: 'https://img.com/1.jpg',
      address: 'Yosemite', latitude: 37.8, longitude: -119.5,
      category: 'nature', season: 'summer', tips: 'Go early',
      best_time: 'Sunrise', permission_info: 'Permit required',
      love_count: 42, source: 'framenest', score: 95,
      author: '', license_url: '', thumbnail_url: '', created_at: '2026-01-01',
      user_name: 'John',
    } as InspirationRow & { user_name: string };
    const result = serializeInspiration(row);
    expect(result.loveCount).toBe(42);
    expect(result.userName).toBe('John');
    expect(result.latitude).toBe(37.8);
  });

  it('serializeClientSite maps professional_id and parses JSON', () => {
    const row = {
      id: 'cli_1', professional_id: 'pro_1', name: 'Dr. Smith',
      slug: 'dr-smith', industry_id: 'medical', custom_domain: null,
      content: '{"bio":"Expert dentist"}', template_config: '{"template":"medical-dentistry"}',
      setup_fee_cents: 5000, monthly_fee_cents: 1000, published: 1,
      created_at: '2026-01-01', updated_at: '2026-01-01', deleted_at: null,
      blog_count: 3, gallery_count: 2,
    } as ClientSiteRow & { blog_count: number; gallery_count: number };
    const result = serializeClientSite(row);
    expect(result.professionalId).toBe('pro_1');
    expect(result.published).toBe(true);
    expect(result.content).toEqual({ bio: 'Expert dentist' });
    expect(result.blogCount).toBe(3);
  });

  it('serializeBlogPost maps published to boolean', () => {
    const row = {
      id: 'blg_1', client_site_id: 'cli_1', title: 'Tips', slug: 'tips',
      body: 'Content here', featured_image: null, published: 1,
      created_at: '2026-01-01', updated_at: '2026-01-01', deleted_at: null,
    } as BlogPostRow;
    const result = serializeBlogPost(row);
    expect(result.published).toBe(true);
    expect(result.clientSiteId).toBe('cli_1');
  });
});
